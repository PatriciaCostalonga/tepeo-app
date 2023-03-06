import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {

    @Input('highlight') searchTerms: string[] = [];

    constructor(private el: ElementRef) { }

    ngAfterViewInit() {
        this.highlight();
    }
    
    private highlight(){
        if (this.el.nativeElement && this.el.nativeElement.textContent) {
            let textContent = this.el.nativeElement.textContent;
            this.searchTerms.forEach(term => {
            const regex = new RegExp('(' + term + ')', 'gi');
            textContent = textContent.replace(regex, '<span class="highlight">$1</span>');
            });
            this.el.nativeElement.innerHTML = textContent;
        }
    }
}
