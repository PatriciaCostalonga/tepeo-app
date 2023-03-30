import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SlideRevealDirective } from './slide-reveal.directive';

@NgModule({
  declarations: [SlideRevealDirective],
  imports: [CommonModule],
  exports: [SlideRevealDirective],
})
export class SlideRevealModule {}
