import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.login(this.credentials).subscribe({
      next: (res) => {
        // Aquí puedes guardar el token si tu backend lo envía
        // localStorage.setItem('token', res.token);
        this.errorMessage = '';
        this.router.navigate(['/']); // Redirige a la página principal o dashboard
      },
      error: () => {
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    });
  }
}
