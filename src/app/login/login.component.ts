import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm : FormGroup;
  authService = inject(AuthService)
  errorMessage: string|null=null
  constructor(private router:Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(""),
      password: new FormControl("")
    });
  }
  login(): void {
    const rawForm = this.loginForm.getRawValue();
    this.authService.login(rawForm.email,rawForm.password).subscribe({next: () => {
      this.router.navigateByUrl('/');
    },
      error: (error) => {
        this.errorMessage = error.code;
      }    
  });
  }
}
