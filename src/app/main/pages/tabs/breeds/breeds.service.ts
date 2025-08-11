import { Injectable } from '@angular/core';
import { BreedsRequestService } from 'src/app/main/services/breeds-request.service';
import { IBreed, IBreedsResponse } from '../../../../core/interfaces/breeds.inteface';

@Injectable({
  providedIn: 'root',
})
export class BreedsService {
  public breeds: any = [];

  constructor(private _breedsRequest: BreedsRequestService) {}

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
