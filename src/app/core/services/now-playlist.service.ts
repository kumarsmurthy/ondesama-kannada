import { Http, URLSearchParams, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { EchoesState } from '../store';

import { NowPlaylistActions, YoutubeMediaPlaylist } from '../store/now-playlist';

import { YoutubeVideosInfo } from './youtube-videos-info.service';

@Injectable()
export class NowPlaylistService {
  public playlist$: Observable<YoutubeMediaPlaylist>;

  constructor(
    public store: Store<EchoesState>,
    private youtubeVideosInfo: YoutubeVideosInfo,
    private nowPlaylistActions: NowPlaylistActions
    ) {
    this.playlist$ = this.store.select(state => state.nowPlaylist);
  }

  queueVideo (mediaId: string) {
    return this.youtubeVideosInfo
      .fetchVideoData(mediaId)
      .map(items => items[0]);
  }

  queueVideos(medias: GoogleApiYouTubeVideoResource[]) {
    this.store.dispatch(this.nowPlaylistActions.queueVideos(medias));
  }

  removeVideo(media) {
    this.store.dispatch(this.nowPlaylistActions.removeVideo(media));
  }

  selectVideo(media) {
    this.store.dispatch(this.nowPlaylistActions.selectVideo(media));
  }

  updateFilter(filter: string) {
    this.store.dispatch(this.nowPlaylistActions.changeFilter(filter));
  }

  clearPlaylist() {
    this.store.dispatch({ type: NowPlaylistActions.REMOVE_ALL });
  }

  selectNextIndex() {
    this.store.dispatch({ type: NowPlaylistActions.SELECT_NEXT });
  }

  getCurrent() {
    let media;
    this.playlist$.take(1).subscribe(playlist => {
      media = playlist.videos.find(video => video.id === playlist.index);
    });
    return media;
  }

  updateIndexByMedia(mediaId: string) {
    this.store.dispatch(this.nowPlaylistActions.updateIndexByMedia(mediaId));
  }
}
