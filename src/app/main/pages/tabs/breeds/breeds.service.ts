import { Injectable } from '@angular/core';
import { BreedsRequestService } from 'src/app/main/services/breeds-request.service';
import { IBreed, IBreedsResponse } from '../../../../core/interfaces/breeds.inteface';
import { ModalController } from '@ionic/angular';
import { BreedPage } from './breed/breed.page';

@Injectable({
  providedIn: 'root',
})
export class BreedsService {

  public title: string = "Breeds";
  public breeds: any = [];

  constructor(
    private _breedsRequest: BreedsRequestService,
    private _modalCtrl: ModalController,
  ) {}

  public async openBreed(breedSelected: string) {
    // open modal breed
    const modal = await this._modalCtrl.create({
      component: BreedPage,
      id: 'BreedPage',
      componentProps: { breedSelected: breedSelected}
    });
    modal.present();

    let result = await modal.onWillDismiss();
  }

  public getAllBreeds() {
    this._breedsRequest.getAllBreeds().then((response: any) => {
      console.log('response: ', response);
      this.breeds = this.transformBreedsToArray(response);
    });
  }

  private transformBreedsToArray(breedsObject: {[key: string]: string[]; }): IBreed[] {
    const breedsArray: IBreed[] = [];

    if (breedsObject && typeof breedsObject === 'object') {
      Object.keys(breedsObject).forEach((breedName) => {
        const subBreeds = breedsObject[breedName] || [];
        breedsArray.push({
          name: this.capitalizeFirstLetter(breedName),
          subBreeds: subBreeds.map((sub) => this.capitalizeFirstLetter(sub)),
        });
      });
    }

    return breedsArray.sort((a, b) => a.name.localeCompare(b.name));
  }

  private capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
