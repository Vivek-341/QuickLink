import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../theme.service';

declare function handleSignOut(): void;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userProfile: any;
  themeService = inject(ThemeService);
  isDarkTheme$ = this.themeService.isDarkTheme$;
  
  constructor(private router: Router) { }
  
  ngOnInit() {
    this.userProfile = JSON.parse(sessionStorage.getItem("loggedInUser") || "null");
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  logout() {
    handleSignOut();
    sessionStorage.removeItem("loggedInUser");
    this.router.navigate(["/login"]).then(() => {
      window.location.reload();
    });
  }
  createPublicRoom() {
    this.router.navigate(['/public-room']);
  }
  createPrivateRoom() {
    this.router.navigate(['/private-room']);
  }
}
