import { NgModule } from '@angular/core';
import { CoreModule } from '../core';

import { YoutubeVideosComponent } from './youtube-videos.component';
import { routing } from './youtube-videos.routing';

@NgModule({
  imports: [
    CoreModule,
    routing
  ],
  declarations: [
    YoutubeVideosComponent
  ],
  exports: [
    YoutubeVideosComponent
  ],
  providers: []
})
export class YoutubeVideosModule { }
