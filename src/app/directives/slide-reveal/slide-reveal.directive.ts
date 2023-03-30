import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { IS_ELEMENT_IN_VIEWPORT } from '../../utils/animation/element-in-viewport';

enum CssClass {
  LOADING_CLASS = 'fade-in',
  STARTING_HIDDEN_CLASS = 'fade-in-starting-state',
}

@Directive({ selector: '[appSlideReveal]' })
export class SlideRevealDirective implements AfterViewInit {
  @Input() rootMargin = '0px';
  @Input() threshold = 0.25;

  constructor(
    private readonly elementReference: ElementRef,
    private readonly renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    this.renderer.addClass(this.elementReference.nativeElement, CssClass.STARTING_HIDDEN_CLASS);

    IS_ELEMENT_IN_VIEWPORT(
      this.elementReference.nativeElement,
      this.addAnimationClass.bind(this),
      this.rootMargin,
      this.threshold
    );
  }

  private addAnimationClass(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.renderer.addClass(this.elementReference.nativeElement, CssClass.LOADING_CLASS);
      }
    });
  }
}
