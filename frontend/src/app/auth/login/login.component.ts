import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage = '';
  successMessage = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    const { email, password } = this.credentials;
    this.userService.login({ email, password }).subscribe({
      next: (response) => {
        console.log('Respuesta del login:', response);
        localStorage.setItem('userId', response.user.id); // O la propiedad correcta según tu backend
        this.router.navigate(['/dashboard']); // Redirige al dashboard
      },
      error: (err) => {
        this.successMessage = '';
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    });
  }
}
