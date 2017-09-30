import { PlayerService } from '../core/services/player.service';
import { YoutubeVideosInfo } from '../core/services/youtube-videos-info.service';
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { EchoesState, getVideoResults$ } from '../core/store';
import { EchoesVideos, videos, YoutubeVideosActions, GoogleApiYoutubeVideo } from '../core/store/youtube-videos';
import { NowPlaylistActions } from '../core/store/now-playlist';
import { FormBuilder, FormGroup } from '@angular/forms';

import { YoutubeSearch } from '../core/services/youtube.search';
import { NowPlaylistService } from '../core/services/now-playlist.service';

import './youtube-videos.less';

import { YoutubeMediaItemsMock } from '../../../tests/mocks/youtube.media.items';

@Component({
  selector: 'youtube-videos',
  template: `
  <article class="col-md-12">
    <div class="navbar navbar-default">
      <form class="navbar-form form-search" id="media-explorer"
        [formGroup]="searchForm"
        (ngSubmit)="search()">
        
        <div class="btn-group btn-group-sm">
          <label type="button" class="btn btn-default navbar-btn">
            <input type="radio" formControlName="preset" value="Kannada songs">Songs
          </label>
          <label type="button" class="btn btn-default navbar-btn">
            <input type="radio" formControlName="preset" value="kannada comedy">Comedy
          </label>
          <label type="button" class="btn btn-default navbar-btn">
            <input type="radio" formControlName="preset" value="Kannada full movie">Movies
          </label>
            <label type="button" class="btn btn-default navbar-btn">
            <input type="radio" formControlName="preset" value="Kannada live news">News
          </label>
            <label type="button" class="btn btn-default navbar-btn">
            <input type="radio" formControlName="preset" value="Kannada short films">Short films
        </label>
        </div>
      </form>
    </div>
    <code>
      There are {{ (videos$ | async).length }} videos
    </code>
    <ul class="list-unstyled">
      <youtube-list [list]="videos$ | async"
        (queue)="queueSelectedVideo($event)"
        (play)="playSelectedVideo($event)"
      ></youtube-list>
    </ul>
    <section *ngIf="(videos$ | async).length">
      <button class="btn btn-primary"
        (click)="searchMore()">
        Search More
      </button>
    </section>
  </article>
  `
})
export class YoutubeVideosComponent implements OnInit {
  videos$: Observable<GoogleApiYoutubeVideo[]>;
  searchForm: FormGroup;

  constructor(
    private youtubeVideosActions: YoutubeVideosActions,
    private nowPlaylistActions: NowPlaylistActions,
    private store: Store<EchoesState>,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.videos$ = this.store.let(getVideoResults$);
    this.setupForm();
  }

  setupForm() {
    this.searchForm = this.formBuilder.group({
      mediaSearch: '',
      preset: ''
    });
    this.searchForm.valueChanges
      .map((changes) => changes.preset)
      .pairwise()
      .filter((presets) => presets[0] !== presets[1])
      .map((presets) => presets[1])
      .subscribe((preset) => this.onPresetChange(preset));
    this.searchForm.patchValue({ preset: '' });
  }

  onPresetChange (preset) {
    this.store.dispatch(this.youtubeVideosActions.updatePreset(preset));
  }

  search (query: string) {
    this.store.dispatch(this.youtubeVideosActions.searchNewQuery(this.searchForm.value.mediaSearch));
  }

  playSelectedVideo (media: GoogleApiYouTubeVideoResource) {
    this.store.dispatch(this.nowPlaylistActions.selectVideo(media));
  }

  queueSelectedVideo (media) {
    this.store.dispatch(this.nowPlaylistActions.queueVideo(media));
  }

  searchMore () {
    this.store.dispatch(this.youtubeVideosActions.searchMore());
  }
}
