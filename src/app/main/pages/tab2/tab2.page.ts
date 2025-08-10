import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

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
