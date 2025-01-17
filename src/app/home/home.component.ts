import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
declare var handleSignOut: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userProfile: any;

  ngOnInit() {
    this.userProfile = JSON.parse(sessionStorage.getItem("loggedInUser")||"");
  }
  constructor(private router: Router) { }
  logout() {
    handleSignOut();
    sessionStorage.removeItem("loggedInUser");
    this.router.navigate(["/login"]).then(() => {
      window.location.reload();
    });
  }

}
