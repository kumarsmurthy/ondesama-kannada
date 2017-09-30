import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';

import { NowPlaylistActions } from '../store/now-playlist';
import { PlayerService } from '../services/player.service';

@Injectable()
export class NowPlaylistEffects {
  constructor(
    private actions$: Actions,
    private nowPlaylistActions: NowPlaylistActions,
    private playerService: PlayerService,
  ) {}

  @Effect()
  queueVideo$ = this.actions$
    .ofType(NowPlaylistActions.SELECT)
    .map(toPayload)
    .map((media) => this.nowPlaylistActions.queueVideo(media));

  @Effect({ dispatch: false })
  playVideo$ = this.actions$
    .ofType(NowPlaylistActions.SELECT)
    .map(toPayload)
    .do((media) => this.playerService.playVideo(media));
}
