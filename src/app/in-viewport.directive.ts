import { Directive, ElementRef, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appInViewport]'
})
export class InViewportDirective implements OnInit, OnDestroy {

  @Output() public inViewport = new EventEmitter();

  private observer: IntersectionObserver;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    // Check that the element is not null before observing it
    if (this.el.nativeElement) {
      this.observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.inViewport.emit();
          }
        });
      });

      this.observer.observe(this.el.nativeElement);
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
