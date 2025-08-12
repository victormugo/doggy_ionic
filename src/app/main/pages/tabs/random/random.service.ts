import { Injectable } from '@angular/core';
import { IBreedImage } from 'src/app/core/interfaces/breed.inteface';
import { BreedsRequestService } from 'src/app/main/services/breeds-request.service';

@Injectable({
  providedIn: 'root',
})
export class RandomService {
  public image: IBreedImage | undefined;
  public breedRandomName: string = '';

  constructor(private _breedsRequestService: BreedsRequestService) {}

  public getRandom() {
    this._breedsRequestService
      .getRandom()
      .then((response: any) => {
        console.log('response: ', response);
        console.log('response: ', response.message);

        this.image = response;
        this.extractBreedName(response);
      })
      .catch((error) => {
        console.error('Error al obtener imágenes:', error);
      });
  }

  private extractBreedName(imageUrl: string): void {
    // Extraer el nombre de la raza de la URL
    // URL ejemplo: "https://images.dog.ceo/breeds/spitz-indian/Indian_Spitz.jpg"
    try {
      const urlParts = imageUrl.split('/');
      const breedPart = urlParts.find(part => part.includes('breeds'));
      const breedIndex = urlParts.indexOf(breedPart!) + 1;
      
      if (breedIndex < urlParts.length) {
        const breedName = urlParts[breedIndex];
        // Convertir "spitz-indian" a "Spitz Indian"
        this.breedRandomName = breedName
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
    } catch (error) {
      console.error('Error al extraer nombre de raza:', error);
      this.breedRandomName = 'Random Dog';
    }
  }
}
