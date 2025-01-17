import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  authService = inject(AuthService);
  errorMessage: string|null=null;

  constructor(private router: Router) {
    {
      this.registerForm = new FormGroup({
        email: new FormControl(''),
        username: new FormControl(''),
        password: new FormControl('')
      });
    }
  }
  onSubmit(): void {
    const rawForm = this.registerForm.getRawValue();
    this.authService.register(rawForm.email, rawForm.username, rawForm.password).subscribe({next: () => {
      this.router.navigateByUrl('/');
    },
      error: (error) => {
        this.errorMessage = error.code;
      }    
  });
  }
}
