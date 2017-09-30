import { NgModule } from '@angular/core';
import { CoreModule } from '../core';

import { Player } from './player.component';

@NgModule({
  imports: [
    CoreModule
  ],
  declarations: [
    Player
  ],
  exports: [
    Player
  ],
  providers: []
})
export class PlayerModule { }
