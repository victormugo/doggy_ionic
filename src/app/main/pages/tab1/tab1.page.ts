import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  constructor() {}

  ionViewCanEnter() {
    console.log('Page 1 ionViewCanEnter');
  }
  
  ngOnInit() {
    console.log('Page 1 ngOnInit');
  }

  ionViewWillEnter() {
    console.log('Page 1 ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.log('Page 1 ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('Page 1 ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('Page 1 ionViewDidLeave');
  }

  ngOnDestroy() {
    console.log('Page 1 ngOnDestroy');
  }
}
