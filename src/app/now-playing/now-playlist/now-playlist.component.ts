import { AfterViewChecked, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { YoutubeMediaPlaylist } from '../../core/store/now-playlist';

import './now-playlist.less';

@Component({
  selector: 'now-playlist',
  template: `
  <section class="now-playlist ux-maker">
    <ul class="nav nav-list ux-maker nicer-ux">
      <li class="now-playlist-track" #playlistTrack
        [class.active]="isActiveMedia(video.id, playlistTrack)"
        *ngFor="let video of playlist.videos | search:playlist.filter; let index = index"
        >
        <a class="" title="{{ video.snippet.title }}"
          (click)="selectVideo(video)">
          <span class="label label-primary fa fa-list-ul playlist-track"
            title="Includes specific cued tracks - soon to come..."
          ></span>
          <span class="track-number">{{ index + 1 }}</span>
          <section class="video-thumb">
            <img draggable="false" 
            src="{{ video.snippet.thumbnails.default.url }}">
          </section>
          <span class="video-title">{{ video.snippet.title }}</span>
          <span class="label label-danger ux-maker remove-track" title="Remove From Playlist"
            (click)="removeVideo(video)"><i class="fa fa-remove"></i></span>
        </a>
      </li>
    </ul>
  </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NowPlaylist implements AfterViewChecked {
  @Input() playlist: YoutubeMediaPlaylist;
  @Output() select = new EventEmitter();
  @Output() remove = new EventEmitter();

  private activeTrackElement: HTMLUListElement;

  constructor() { }

  ngAfterViewChecked() {
    this.scrollToActiveTrack();
  }
  scrollToActiveTrack() {
    if (this.activeTrackElement) {
      this.activeTrackElement.scrollIntoView();
    }
  }

  selectVideo (media) {
    this.select.emit(media);
  }

  removeVideo (media: GoogleApiYouTubeSearchResource) {
    this.remove.emit(media);
  }

  isActiveMedia(mediaId: string, trackElement: HTMLUListElement) {
    const isActive = this.playlist.index === mediaId;
    if (isActive) {
      this.activeTrackElement = trackElement;
    }
    return isActive;
  }
}
