import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // <-- AGREGA RouterModule
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // <-- AGREGA RouterModule aquí
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage = '';
  successMessage = ''; // Agrega esta línea

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.login(this.credentials).subscribe({
      next: (res) => {
        this.errorMessage = '';
        this.successMessage = '¡Login exitoso! Redirigiendo...';
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500); // Puedes ajustar el tiempo o quitar el setTimeout si no quieres esperar
      },
      error: () => {
        this.successMessage = '';
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    });
  }
}
