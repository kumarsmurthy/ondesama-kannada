import { PlayerService } from '../core/services/player.service';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { EchoesState } from '../core/store';
import { NowPlaylistService } from '../core/services/now-playlist.service';
import { YoutubeMediaPlaylist } from '../core/store/now-playlist';
import { NowPlaylist } from './now-playlist';

@Component({
  selector: 'now-playing',
  template: `
  <div class="sidebar-pane">
    <now-playlist-filter
      [playlist]="nowPlaylist$ | async"
      (clear)="clearPlaylist()"
      (filter)="updateFilter($event)"
      (reset)="resetFilter()"
    ></now-playlist-filter>
    <now-playlist
      [playlist]="nowPlaylist$ | async"
      (select)="selectVideo($event)"
      (remove)="removeVideo($event)"
    ></now-playlist>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NowPlaying implements OnInit {
  public nowPlaylist$: Observable<YoutubeMediaPlaylist>;

  constructor(
    public nowPlaylistService: NowPlaylistService,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    this.nowPlaylist$ = this.nowPlaylistService.playlist$;
  }

  selectVideo (media: GoogleApiYouTubeVideoResource) {
    this.nowPlaylistService.updateIndexByMedia(media.id);
    this.playerService.playVideo(media);
  }

  updateFilter (searchFilter: string) {
    this.nowPlaylistService.updateFilter(searchFilter);
  }

  resetFilter () {
    this.nowPlaylistService.updateFilter('');
  }

  clearPlaylist () {
    this.nowPlaylistService.clearPlaylist();
  }

  removeVideo (media) {
    this.nowPlaylistService.removeVideo(media);
  }
}
