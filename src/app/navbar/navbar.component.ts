import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
declare var handleSignOut: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userProfile: any;
  
  constructor(private router: Router) { }
  
  ngOnInit() {
    this.userProfile = JSON.parse(sessionStorage.getItem("loggedInUser") || "null");
  }

  logout() {
    handleSignOut();
    sessionStorage.removeItem("loggedInUser");
    this.router.navigate(["/login"]).then(() => {
      window.location.reload();
    });
  }
}
