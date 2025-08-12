import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main/pages/tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'breeds',
      },
      {
        path: 'breeds',
        loadComponent: () => import('./main/pages/tabs/breeds/breeds.page').then((m) => m.BreedsPage),
      },
      {
        path: 'random',
        loadComponent: () => import('./main/pages/tabs/random/random.page').then((m) => m.RandomPage),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
  {
    path: 'breed',
    loadComponent: () => import('./main/pages/tabs/breeds/breed/breed.page').then( m => m.BreedPage)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
