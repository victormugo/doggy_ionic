import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { RandomService } from './random.service';

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
    console.log('Page 2 ionViewCanEnter');
  }

  ngOnInit() {
    console.log('Page 2 ngOnInit');
  }

  ionViewWillEnter() {
    console.log('Page 2 ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.log('Page 2 ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('Page 2 ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('Page 2 ionViewDidLeave');
  }

  ngOnDestroy() {
    console.log('Page 2 ngOnDestroy');
  }

  public get title() {
    return this._randomService.title;
  }

  public onHeaderClick(event: any) {
    switch (event.action) {
      case 'settings':
        break;
    }
  }
}
