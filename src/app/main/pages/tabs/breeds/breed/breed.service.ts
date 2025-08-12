import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IBreedImage } from 'src/app/core/interfaces/breed.inteface';
import { BreedsRequestService } from 'src/app/main/services/breeds-request.service';

@Injectable({
  providedIn: 'root',
})
export class BreedService {

  public images: IBreedImage[] = [];
  public displayedImages: IBreedImage[] = [];
  public loading: boolean = false;
  public hasMoreImages: boolean = false;

  private readonly IMAGES_PER_PAGE = 5;
  private currentPage = 0;

  constructor(
    private _breedsRequest: BreedsRequestService,
    private _modalCtrl: ModalController
  ) {}

  public closeModal() {
    this._modalCtrl.dismiss('','','BreedPage');
  }

  public getBreedById(selectedBreed: string) {
    this.loading = true;
    this.resetPagination();

    this._breedsRequest
      .getBreedById(selectedBreed)
      .then((response: any) => {
        console.log('response: ', response);

        this.images = this.transformImagesToArray(response);
        this.loadNextPage();
        this.loading = false;
      })
      .catch((error) => {
        console.error('Error al obtener imágenes:', error);
        this.images = [];
        this.displayedImages = [];
        this.loading = false;
      });
  }

  private transformImagesToArray(imageUrls: string[]): IBreedImage[] {
    if (!Array.isArray(imageUrls)) {
      console.error('La respuesta no es un array:', imageUrls);
      return [];
    }

    return imageUrls.map((url) => ({
      image: url,
      loaded: false,
    }));
  }

  public loadNextPage(): void {
    if (!this.hasMoreImages && this.currentPage > 0) {
      return;
    }

    const startIndex = this.currentPage * this.IMAGES_PER_PAGE;
    const endIndex = startIndex + this.IMAGES_PER_PAGE;
    const nextImages = this.images.slice(startIndex, endIndex);

    if (nextImages.length > 0) {
      this.displayedImages = [...this.displayedImages, ...nextImages];
      this.currentPage++;
      this.hasMoreImages = endIndex < this.images.length;

      console.log(
        `Página ${this.currentPage} cargada. Mostrando ${this.displayedImages.length} de ${this.images.length} imágenes`
      );
    } else {
      this.hasMoreImages = false;
    }
  }

  public onImageLoad(image: IBreedImage): void {
    image.loaded = true;
  }

  public onImageError(image: IBreedImage): void {
    console.error('Error al cargar imagen:', image.image);
    image.loaded = false;
  }

  private resetPagination(): void {
    this.currentPage = 0;
    this.displayedImages = [];
    this.hasMoreImages = true;
  }

  public onScroll(event: any): void {
    const element = event.target;
    const threshold = 100;

    if (
      element.scrollHeight - element.scrollTop <=
      element.clientHeight + threshold
    ) {
      if (this.hasMoreImages && !this.loading) {
        console.log('Cargando más imágenes...');
        this.loadNextPage();
      }
    }
  }

  public loadMore(): void {
    if (this.hasMoreImages && !this.loading) {
      this.loadNextPage();
    }
  }
}
