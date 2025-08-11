import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonHeader } from "@ionic/angular/standalone";

@Component({
  selector: 'app-random',
  templateUrl: 'random.page.html',
  styleUrls: ['random.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RandomPage {

  constructor() {}

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
}
