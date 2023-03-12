import { Component, ElementRef, Input, OnInit, ViewChild, HostListener, TemplateRef } from '@angular/core';
import { MockDataService } from '../../mock-data/mock-data.service';
import { Observable } from 'rxjs';
import { HighlightDirective } from '../../highlight.directive';
import { InViewportDirective } from '../../in-viewport.directive';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-in', style({ opacity: 1 })),
      ]),
    ]),
    trigger('onInViewport', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.3s ease-in', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})

export class SectionComponent implements OnInit {
  @Input() searchTerm: string | string[];
  @ViewChild('content') content: ElementRef;
  @ViewChild('firstItem') firstItem: TemplateRef<any>;

  mockData$: Observable<any[]>;
  el: ElementRef;

  constructor(private mockDataService: MockDataService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.mockDataService.getMockData().subscribe((data: any[]) => {
      this.mockData$ = this.mockDataService.getMockData();
    });
  }

  private highlight(): void {
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

  fadeIn(item: any): void {

    console.log("fadein");

    // Trigger fade-in animation for first item
    item.show = true;

    
  }

  onInViewport(item: any): void {

    console.log("onInViewport");

    // Trigger fade-in animation for other items
    item.show = true;
  }
}
