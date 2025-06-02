import { Component } from '@angular/core'; // Importa Component para definir el componente
import { CommonModule } from '@angular/common'; // Importa CommonModule para directivas comunes de Angular
import { FormsModule } from '@angular/forms'; // Importa FormsModule para usar formularios template-driven
import { Router, RouterModule } from '@angular/router'; // Importa Router y RouterModule para navegación
import { UserService } from '../user.service'; // Importa el servicio de usuario para autenticación

@Component({
  selector: 'app-login', // Selector para usar este componente en HTML
  standalone: true, // Indica que es un componente standalone (no necesita módulo)
  imports: [CommonModule, FormsModule, RouterModule], // Importa módulos necesarios para el template
  templateUrl: './login.component.html', // Ruta al archivo de template HTML
  styleUrl: './login.component.css' // Ruta al archivo de estilos CSS
})
export class LoginComponent {
  credentials = { email: '', password: '' }; // Objeto para almacenar los datos del formulario
  errorMessage = ''; // Mensaje de error para mostrar en el template
  successMessage = ''; // Mensaje de éxito para mostrar en el template

  // Inyecta el servicio de usuario y el router para navegación
  constructor(private userService: UserService, private router: Router) {}

  // Método que se ejecuta al enviar el formulario de login
  onSubmit() {
    const { email, password } = this.credentials; // Obtiene email y password del formulario
    this.userService.login({ email, password }).subscribe({
      next: (response) => {
        // Si el login es exitoso, guarda el userId en localStorage
        console.log('Respuesta del login:', response);
        localStorage.setItem('userId', response.user.id); // Ajusta la propiedad según tu backend
        this.router.navigate(['/dashboard']); // Redirige al dashboard
      },
      error: (err) => {
        // Si hay error, muestra mensaje de error
        this.successMessage = '';
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    });
  }
}
