import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizerPipe } from './sanitizer/sanitizer.pipe';
import { ImagePipe } from './image/image.pipe';

@NgModule({
  declarations: [
    SanitizerPipe,
    ImagePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SanitizerPipe,
    ImagePipe
  ]
})

export class PipesModule { }
