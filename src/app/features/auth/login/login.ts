import { Component, DestroyRef, inject, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoginRequest } from '../../../core/models/user.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = signal('');
  password = signal('');
  isLoading = signal(false);
  errorMessage = signal('');

  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  onLogin() {

    this.isLoading.set(true);
    this.errorMessage.set('');

    const credentials: LoginRequest = {
      email: this.email(),
      password: this.password()
    }

    this.authService.login(credentials)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (response) => {
          // console.log('Login successful:', response);
          this.isLoading.set(false);
          this.router.navigate(['/calendar']);
        },
        error: (error) => {
          // console.error('Login failed:', error);
          this.errorMessage.set('Login failed. Please check your credentials and try again.');
          this.isLoading.set(false);
        }
      });

  }

}
