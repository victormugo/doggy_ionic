import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { BreedService } from './breed.service';
import { IBreedImage } from 'src/app/core/interfaces/breed.inteface';

@Component({
  selector: 'app-breed',
  templateUrl: './breed.page.html',
  styleUrls: ['./breed.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent],
})
export class BreedPage implements OnInit, OnDestroy {
  @Input() breedSelected: string = '';

  constructor(private _breedService: BreedService) {}

  ionViewCanEnter() {
    console.log('Breed ionViewCanEnter');
  }

  ngOnInit() {
    console.log('Breed ngOnInit');
    console.log('breedSelected: ' + this.breedSelected);
    this._breedService.getBreedById(this.breedSelected);
  }

  ionViewWillEnter() {
    console.log('Breed ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.log('Breed ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('Breed ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('Breed ionViewDidLeave');
  }

  ngOnDestroy() {
    console.log('Breed ngOnDestroy');
  }

  public get images() {
    return this._breedService.images;
  }

  public get displayedImages() {
    return this._breedService.displayedImages;
  }

  public get loading() {
    return this._breedService.loading;
  }

  public get hasMoreImages() {
    return this._breedService.hasMoreImages;
  }

  public onImageLoad(image: IBreedImage): void {
    this._breedService.onImageLoad(image);
  }

  public onImageError(image: IBreedImage): void {
    this._breedService.onImageError(image);
  }

  public onScroll(event: any): void {
    this._breedService.onScroll(event);
  }

  public loadMore(): void {
    this._breedService.loadMore();
  }

  public onHeaderClick(event: any) {
    switch (event.action) {
      case 'close':
        this._breedService.closeModal();
        break;
    }
  }
}
