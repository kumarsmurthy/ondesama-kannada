import { Observable } from 'rxjs/Rx';
import { NgModule } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ActionReducer, Action, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';

// reducers
import { EchoesVideos, GoogleApiYoutubeVideo, videos, YoutubeVideosActions } from './youtube-videos';
import { nowPlaylist, NowPlaylistActions, YoutubeMediaPlaylist } from './now-playlist';

// plugins

/**
 * we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface EchoesState {
  videos: EchoesVideos;
  nowPlaylist: YoutubeMediaPlaylist;
}

export const getVideoResults$ = (store$: Observable<EchoesState>): Observable<GoogleApiYoutubeVideo[]> => {
  return store$.select(state => state.videos.results);
};

const actions = [
  YoutubeVideosActions,
  NowPlaylistActions
];

const reducers = { videos, nowPlaylist };
const optionalImports = [];
if ('production' !== ENV) {
  // Note that you must instrument after importing StoreModule
  optionalImports.push(StoreDevtoolsModule.instrumentOnlyWithExtension());
}

@NgModule({
  imports: [
    StoreModule.provideStore(reducers),
    ...optionalImports
  ],
  declarations: [

  ],
  exports: [

  ],
  providers: [ ...actions ]
})
export class CoreStoreModule {};
