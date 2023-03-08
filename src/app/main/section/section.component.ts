import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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

  constructor(private mockDataService: MockDataService) { }

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
}
