import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { RandomService } from './random.service';
import { IBreedImage } from 'src/app/core/interfaces/breed.inteface';
import { CooldownService, CooldownState } from 'src/app/core/services/cooldown.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-random',
  templateUrl: 'random.page.html',
  styleUrls: ['random.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent],
})
export class RandomPage implements OnInit, OnDestroy {
  private readonly REFRESH_COOLDOWN_ID = 'random-refresh';
  private readonly COOLDOWN_DURATION = 10000; // 10 segundos
  
  cooldownState: CooldownState = {
    isActive: false,
    remainingTime: 0,
    totalTime: this.COOLDOWN_DURATION
  };
  
  private cooldownSubscription?: Subscription;

  constructor(
    private _randomService: RandomService,
    private cooldownService: CooldownService
  ) {}

  ionViewCanEnter() {
    console.log('Random ionViewCanEnter');
  }

  ngOnInit() {
    console.log('Random ngOnInit');
    this._randomService.getRandom();
    this.initializeCooldown();
  }

  ionViewWillEnter() {
    console.log('Random ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.log('Random ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('Random ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('Random ionViewDidLeave');
  }

  ngOnDestroy() {
    console.log('Random ngOnDestroy');
    if (this.cooldownSubscription) {
      this.cooldownSubscription.unsubscribe();
    }
  }

  public get image() {
    return this._randomService.image;
  }

  public get breedRandomName() {
    return this._randomService.breedRandomName;
  }

  public onHeaderClick(event: any) {
    switch (event.action) {
      case 'refresh':
        this.handleRefresh();
        break;
    }
  }

  /**
   * Inicializa el sistema de cooldown
   */
  private initializeCooldown(): void {
    // Suscribirse a cambios del estado de cooldown
    const cooldownObservable = this.cooldownService.getCooldownState(this.REFRESH_COOLDOWN_ID);
    if (cooldownObservable) {
      this.cooldownSubscription = cooldownObservable.subscribe(state => {
        this.cooldownState = state;
      });
    }
  }

  /**
   * Maneja el evento de refresh con cooldown
   */
  private handleRefresh(): void {
    if (this.cooldownService.canExecute(this.REFRESH_COOLDOWN_ID)) {
      console.log('Ejecutando refresh - cooldown iniciado');
      this._randomService.getRandom();
      this.cooldownService.startCooldown(this.REFRESH_COOLDOWN_ID, this.COOLDOWN_DURATION);
    } else {
      console.log('Refresh bloqueado - cooldown activo');
      // Opcional: mostrar un toast o mensaje al usuario
    }
  }

  /**
   * Verifica si el botón de refresh está disponible
   */
  public get isRefreshEnabled(): boolean {
    return this.cooldownService.canExecute(this.REFRESH_COOLDOWN_ID);
  }

  /**
   * Obtiene el tiempo restante formateado
   */
  public get remainingTimeFormatted(): string {
    return this.cooldownService.formatTime(this.cooldownState.remainingTime);
  }

  /**
   * Obtiene el progreso del cooldown (0-100)
   */
  public get cooldownProgress(): number {
    return this.cooldownService.getCooldownProgress(this.REFRESH_COOLDOWN_ID);
  }
}
