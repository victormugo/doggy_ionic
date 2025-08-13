import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpService } from './services/http.service';
import { AboutPage } from './pages/about/about.page';
import { SettingsPage } from './pages/settings/settings.page';
import { AboutService } from './pages/about/about.service';
import { SettingsService } from './pages/settings/settings.service';

@NgModule({
  imports: [
    AboutPage,
    SettingsPage
  ],
  declarations: [],
  providers: [
    HttpService,
    AboutService,
    SettingsService
  ],
  exports: [
    AboutPage,
    SettingsPage
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      )
    }
  }
}