import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from './../shared/pipes/pipes.module';
import { UnauthorizedHideDirective } from './directives/unauthorized-hide.directive';
import { UnauthorizedDisableDirective } from './directives/unauthorized-disable.directive';

@NgModule({
  imports: [
    CommonModule,
    PipesModule,
  ],
  exports: [
    PipesModule,
    UnauthorizedHideDirective,
    UnauthorizedDisableDirective
  ],
  providers: [],
  declarations: [
    UnauthorizedHideDirective,
    UnauthorizedDisableDirective
  ]
})
export class SharedModule { }
