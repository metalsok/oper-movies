import { Injectable } from '@angular/core';
import { Theme } from '../enums/theme.enum';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: Theme = Theme.Light;

  setTheme(theme: Theme) {
    const htmlElement = document.documentElement;
    if (theme === Theme.Dark) {
      htmlElement.classList.add(Theme.Dark);
    } else {
      htmlElement.classList.remove(Theme.Dark);
    }
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme') as Theme;
    this.setTheme(savedTheme || Theme.Light);
  }

  getCurrentTheme(): Theme {
    return localStorage.getItem('theme') as Theme;
  }

  toggleTheme() {
    const newTheme =
      this.getCurrentTheme() === Theme.Light ? Theme.Dark : Theme.Light;
    this.setTheme(newTheme);
  }
}
