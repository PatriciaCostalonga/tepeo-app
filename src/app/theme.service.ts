import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {

  private readonly THEME_KEY = 'theme';
  private readonly LIGHT_THEME = 'light';
  private readonly DARK_THEME = 'dark';

  constructor() { }

  public getTheme(): string {
    return localStorage.getItem(this.THEME_KEY) || this.LIGHT_THEME;
  }

  public setTheme(theme: string): void {
    localStorage.setItem(this.THEME_KEY, theme);
  }

  public isDarkTheme(): boolean {
    return this.getTheme() === this.DARK_THEME;
  }

  public isLightTheme(): boolean {
    return this.getTheme() === this.LIGHT_THEME;
  }
}