import { Component, ElementRef, Input, OnInit, ViewChild, HostListener, ChangeDetectorRef } from '@angular/core';
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
    ])
  ],
})

export class SectionComponent implements OnInit {
  @Input() searchTerm: string | string[];
  @ViewChild('content') content: ElementRef;

  mockData$: Observable<any[]>;
  el: ElementRef;
  shownItems: any[] = [];

  constructor(
    private mockDataService: MockDataService, 
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef) { }

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

  onInViewport(item: any): void {
    if (!this.shownItems.includes(item)) {
      item.show = true;
      this.shownItems.push(item);
      setTimeout(() => {
        this.changeDetectorRef.detectChanges();
      });
    }
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }
}
