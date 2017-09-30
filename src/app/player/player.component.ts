import { Component, ChangeDetectionStrategy, OnInit, AfterContentInit
} from '@angular/core';

import { PlayerService } from '../core/services/player.service';
import './player.less';

@Component({
  selector: 'player',
  template: `
  <div class="show-youtube-player">
    <section class="yt-player">
      <div id="yt-player-ng2-component" #ytPlayerContainer></div>
    </section>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Player implements OnInit, AfterContentInit {
  constructor(
    private playerService: PlayerService,
  ) { }

  ngAfterContentInit() {
    const htmlId = 'yt-player-ng2-component';
    this.playerService.loadPlayerApi();
    this.playerService.setupPlayer(htmlId);
  }

  ngOnInit() {
  }

  playVideo() {
    // this.playerService.play();
    // this.play.next(this.player.media);
  }

  pauseVideo() {
    // this.playerService.pause();
  }

  togglePlayer() {
    // this.playerService.togglePlayer();
  }

  playNextTrack() {
    // this.playNext.next(this.player);
  }
}
