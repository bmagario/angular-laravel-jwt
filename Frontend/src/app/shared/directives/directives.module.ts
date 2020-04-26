// Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Directives
import { UnauthorizedHideDirective } from '../../shared/directives/unauthorized-hide.directive';
import { UnauthorizedDisableDirective } from '../../shared/directives/unauthorized-disable.directive';

@NgModule({
  declarations: [
    UnauthorizedHideDirective,
    UnauthorizedDisableDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UnauthorizedHideDirective,
    UnauthorizedDisableDirective
  ]
})
export class DirectivesModule { }
