import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemeService } from './theme.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
  title = 'tepeo';

  constructor(private readonly themeService: ThemeService) {}

  ngOnInit(): void {
    if (this.themeService.isDarkTheme()) {
      document.body.classList.add('dark-theme');
      console.log("This users uses dark mode");
    } else {
      document.body.classList.add('light-theme');
      console.log("This users uses light mode");
    }
  }
}
