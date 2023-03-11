import { Component, ElementRef, Input, OnInit, ViewChild, HostListener } from '@angular/core';
import { MockDataService } from '../../mock-data/mock-data.service';
import { HighlightDirective } from '../../highlight.directive';

@Component({
  selector: 'section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})

export class SectionComponent implements OnInit {
  @Input() searchTerm: string | string[];
  @ViewChild('content') content: ElementRef;

  mockData: any[];
  el: ElementRef;

  constructor(private mockDataService: MockDataService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.mockDataService.getMockData().subscribe((data) => {
      this.mockData = data;
    });
  }

  private highlight() {
    let searchTerms = Array.isArray(this.searchTerm) ? this.searchTerm : [this.searchTerm];

    if (searchTerms.length > 0 && this.content.nativeElement.textContent) {
      let textContent = this.content.nativeElement.textContent;

      searchTerms.forEach(term => {
        const regex = new RegExp('(' + term + ')', 'gi');
        textContent = textContent.replace(regex, '<span class="highlight">$1</span>');
      });

      this.content.nativeElement.innerHTML = textContent;
    }
  }

  ngAfterViewInit() {
    this.content.nativeElement.classList.add('fade-in-section');
    this.el = this.elementRef;
  }

  @HostListener('window:scroll', ['$event'])
  checkInView() {
    const element = this.el.nativeElement;
    if (this.isElementInViewport(element)) {
      element.classList.add('fade-in');
    }
  }

  isElementInViewport(el: any) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}
