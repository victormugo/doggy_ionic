import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreedsService } from './breeds.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "src/app/core/components/header/header.component";

@Component({
  selector: 'app-breeds',
  templateUrl: 'breeds.page.html',
  styleUrls: ['breeds.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent]
})
export class BreedsPage implements OnInit, OnDestroy{

  constructor(
    private _breedsService: BreedsService
  ) {}

  public get title() {
    return this._breedsService.title;
  }

  public get breeds() {
    return this._breedsService.breeds;
  }

  ionViewCanEnter() {
    console.log('Page 1 ionViewCanEnter');
  }
  
  ngOnInit() {
    console.log('Page 1 ngOnInit');
    this._breedsService.getAllBreeds();
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

  public onHeaderClick(event: any) {

    switch (event.action) {
      case 'settings':
        break;
    }
  }
}
