import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject<boolean>(false);
  isDarkTheme$ = this.isDarkTheme.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Only run this code in the browser
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.isDarkTheme.next(savedTheme === 'dark');
        this.setTheme(savedTheme === 'dark');
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.isDarkTheme.next(prefersDark);
        this.setTheme(prefersDark);
      }
    }
  }

  toggleTheme() {
    this.isDarkTheme.next(!this.isDarkTheme.value);
    this.setTheme(this.isDarkTheme.value);
  }

  private setTheme(isDark: boolean) {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.toggle('dark-theme', isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  }
}