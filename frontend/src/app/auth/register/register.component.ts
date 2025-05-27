import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  credentials = {
    nombre: '',
    email: '',
    tipo_de_documento: '',
    documento: '',
    telefono: '',
    eps: '',
    password: ''
  };
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    if (this.credentials.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      this.successMessage = '';
      return;
    }
    this.userService.register(this.credentials).subscribe({
      next: () => {
        this.successMessage = '¡Registrado correctamente! Redirigiendo al login...';
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: () => {
        this.errorMessage = 'Error al registrar usuario';
        this.successMessage = '';
      }
    });
  }
}