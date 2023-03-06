import { ChangeDetectorRef, Component, Injectable, OnInit } from "@angular/core";
import { ThemeService } from '.././theme.service';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss', '.././app.component.scss']
})

export class HeaderComponent {

    constructor(private readonly themeService: ThemeService) {}

    public toggleTheme(): void {
        if (this.themeService.isDarkTheme()) {
            this.themeService.setTheme('light');
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
        } else {
            this.themeService.setTheme('dark');
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
        }
    }
}