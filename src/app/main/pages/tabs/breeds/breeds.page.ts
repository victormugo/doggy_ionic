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
    console.log('Breeds ionViewCanEnter');
  }
  
  ngOnInit() {
    console.log('Breeds ngOnInit');
    this._breedsService.getAllBreeds();
  }

  ionViewWillEnter() {
    console.log('Breeds ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.log('Breeds ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('Breeds ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('Breeds ionViewDidLeave');
  }

  ngOnDestroy() {
    console.log('Breeds ngOnDestroy');
  }

  public openBreed(breedSelected: string) {
    this._breedsService.openBreed(breedSelected);
  }

  public onHeaderClick(event: any) {

    switch (event.action) {
      case 'settings':
        break;
    }
  }
}
