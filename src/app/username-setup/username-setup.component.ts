import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-username-setup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './username-setup.component.html',
  styleUrl: './username-setup.component.css'
})
export class UsernameSetupComponent implements OnInit {
  userProfile: any;
  usernameForm: FormGroup;
  generatedUsername: string = '';

  constructor(private router: Router) {
    this.usernameForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9_#@$]{6,20}$')
      ])
    });
  }

  ngOnInit() {
    const userStr = sessionStorage.getItem("loggedInUser");
    if (!userStr) {
      this.router.navigate(['/login']);
      return;
    }
    this.userProfile = JSON.parse(userStr);
    this.generateUsername();
  }

  generateUsername() {
    const name = this.userProfile.name.replace(/\s+/g, '');
    const randomNum = Math.floor(Math.random() * 1000);
    const specialChars = ['#', '@', '$', '_'];
    const randomChar = specialChars[Math.floor(Math.random() * specialChars.length)];
    const randomUpperCase = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    
    this.generatedUsername = `${randomUpperCase}${name}${randomChar}${randomNum}`;
    this.usernameForm.patchValue({ username: this.generatedUsername });
  }

  onSubmit() {
    if (this.usernameForm.valid) {
      const username = this.usernameForm.get('username')?.value;
      const updatedProfile = { ...this.userProfile, username };
      sessionStorage.setItem("loggedInUser", JSON.stringify(updatedProfile));
      this.router.navigate(['/home']);
    }
  }
}
