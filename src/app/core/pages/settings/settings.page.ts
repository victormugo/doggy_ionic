import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { HeaderComponent } from '../../components/header/header.component';
import { ThemeService, ThemeMode } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent],
})
export class SettingsPage implements OnInit, OnDestroy {
  selectedTheme: ThemeMode = 'system';
  private themeSubscription?: Subscription;

  constructor(
    private themeService: ThemeService,
    private navController: NavController
  ) { }

  ngOnInit() {
    // Suscribirse a cambios de tema
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      this.selectedTheme = theme;
    });
    
    // Inicializar el tema seleccionado
    this.selectedTheme = this.themeService.getCurrentTheme();
    
    // Escuchar cambios del sistema
    this.themeService.watchSystemTheme();
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  /**
   * Maneja el cambio de tema
   */
  onThemeChange(event: any) {
    const newTheme = event.detail.value as ThemeMode;
    this.themeService.setTheme(newTheme);
  }

  /**
   * Obtiene la descripción del tema actual
   */
  getThemeDescription(): string {
    return this.themeService.getThemeDescription(this.selectedTheme);
  }

  /**
   * Obtiene el icono del tema actual
   */
  getThemeIcon(): string {
    return this.themeService.getThemeIcon(this.selectedTheme);
  }

  /**
   * Maneja las acciones del header
   */
  onHeaderAction(event: any) {
    switch (event.action) {
      case 'close':
        this.navController.back();
        break;
    }
  }
}
