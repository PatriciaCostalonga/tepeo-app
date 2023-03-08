import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ThemeService } from './theme.service';
import { MockDataService } from './mock-data/mock-data.service';
import { HighlightDirective } from './highlight.directive';

import { AppComponent } from './app.component';
import { SectionComponent } from './main/section/section.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    HighlightDirective,
    SectionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ThemeService, 
    MockDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
