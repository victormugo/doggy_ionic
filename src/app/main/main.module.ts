import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BreedsPage } from './pages/tabs/breeds/breeds.page';
import { RandomPage } from './pages/tabs/random/random.page';
import { BreedsService } from './pages/tabs/breeds/breeds.service';
import { RandomService } from './pages/tabs/random/random.service';
import { BreedsRequestService } from './services/breeds-request.service';
import { BreedPage } from './pages/tabs/breeds/breed/breed.page';

@NgModule({
  imports: [
    BreedsPage,
    RandomPage,
    BreedPage
  ],
  declarations: [],
  providers: [
    BreedsRequestService,
    BreedsService,
    RandomService
  ],
  exports: [
    BreedsPage,
    RandomPage,
    BreedPage
  ]
})

export class MainModule {
  constructor(@Optional() @SkipSelf() parentModule: MainModule) {
    if (parentModule) {
      throw new Error(
        'MainModule is already loaded. Import it in the AppModule only'
      )
    }
  }
}
