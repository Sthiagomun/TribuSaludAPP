import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  errorMessage = '';

  onSubmit() {
    // Lógica de autenticación aquí
    if (this.credentials.username === 'admin' && this.credentials.password === 'admin') {
      this.errorMessage = '';
      // Redirigir o mostrar éxito
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos';
    }
  }
}
