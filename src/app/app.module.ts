import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Platform and Environment providers/directives/pipes
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';

// App is our top level component
import { App } from './app.component';

// COMPONENTS
import { CORE_COMPONENTS } from './core/components';

import { YoutubeVideosModule } from './youtube-videos';
import { NowPlayingModule } from './now-playing';
import { PlayerModule } from './player';

import { CoreModule } from './core';
// SERVICES
import { APP_SERVICES } from './core/services';

import 'rxjs/Rx';

// Application wide providers
const APP_PROVIDERS = [
  APP_SERVICES
];

// AppModule is the main entry point into Angular2's bootstraping process
@NgModule({
  bootstrap: [ App ],
  declarations: [
    App
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    CoreModule,

    YoutubeVideosModule,
    NowPlayingModule,
    PlayerModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule { }
