import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { YoutubeMediaPlaylist } from '../../core/store/now-playlist';
import './now-playlist-filter.less';

@Component({
  selector: 'now-playlist-filter',
  template: `
  <h3 class="nav-header user-playlists-filter">
    <span class="text btn-transparent">
      Now Playing <span *ngIf="!isPlaylistEmpty()">({{ playlistLength }})</span>
    </span>
    <button class="btn btn-link btn-xs btn-clear" title="Clear All Tracks In Now Playlist"
      [disabled]="isPlaylistEmpty()"
      (click)="clearPlaylist()">
      <span class="fa fa-trash-o"></span>
    </button>
    <div class="playlist-filter pull-right">
      <i class="fa fa-search" *ngIf="isFilterEmpty()"></i>
      <i class="fa fa-remove text-danger" 
        *ngIf="!isFilterEmpty()" 
        (click)="resetSearchFilter()"
      ></i>
      <input type="search" name="playlist-search"
        [value]="playlist.filter"
        #searchFilter
        (input)="handleFilterChange(searchFilter.value)">
    </div>
  </h3>
  `,
  styles: [`
    :host [hidden] {
      display: none;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NowPlaylistFilter {
  @Input() playlist: YoutubeMediaPlaylist;
  @Output() clear = new EventEmitter<string>();
  @Output() filter = new EventEmitter<string>();
  @Output() reset = new EventEmitter<string>();

  constructor() {

  }

  handleFilterChange (searchFilter: string) {
    this.filter.emit(searchFilter);
  }

  resetSearchFilter () {
    this.reset.emit('');
  }

  isFilterEmpty () {
    return this.playlist.filter === '';
  }

  clearPlaylist () {
    this.clear.emit('');
  }

  isPlaylistEmpty() {
    return this.playlistLength === 0;
  }

  get playlistLength () {
    return this.playlist.videos.length;
  }
}
