import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { RandomService } from './random.service';
import { IBreedImage } from 'src/app/core/interfaces/breed.inteface';

@Component({
  selector: 'app-random',
  templateUrl: 'random.page.html',
  styleUrls: ['random.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent],
})
export class RandomPage {

  constructor(
    private _randomService: RandomService
  ) {}

  ionViewCanEnter() {
    console.log('Random ionViewCanEnter');
  }

  ngOnInit() {
    console.log('Random ngOnInit');
    this._randomService.getRandom();
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
        this._randomService.getRandom();
        break;
    }
  }
}
