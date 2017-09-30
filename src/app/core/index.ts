import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { CORE_COMPONENTS } from './components';
import { PIPES } from './pipes';

import { CoreStoreModule } from './store';
import { AppEffects } from './effects';

const AppEffectsModules = [
  EffectsModule.run(AppEffects[0]),
  EffectsModule.run(AppEffects[1])
];

@NgModule({
  imports: [
    InfiniteScrollModule,
    CommonModule,
    ReactiveFormsModule,
    CoreStoreModule,
    ...AppEffectsModules
  ],
  declarations: [
    ...CORE_COMPONENTS,
    ...PIPES
  ],
  exports: [
    InfiniteScrollModule,
    ...CORE_COMPONENTS,
    CommonModule,
    ReactiveFormsModule,
    CoreStoreModule,
    ...PIPES
  ],
  providers: []
})
export class CoreModule { }
