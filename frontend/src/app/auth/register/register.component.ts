import { Component } from '@angular/core'; // Importa Component para definir el componente
import { CommonModule } from '@angular/common'; // Importa CommonModule para directivas comunes de Angular
import { FormsModule } from '@angular/forms'; // Importa FormsModule para usar formularios template-driven
import { Router, RouterModule } from '@angular/router'; // Importa Router y RouterModule para navegación
import { UserService } from '../user.service'; // Importa el servicio de usuario para registro

@Component({
  selector: 'app-register', // Selector para usar este componente en HTML
  standalone: true, // Indica que es un componente standalone (no necesita módulo)
  imports: [CommonModule, FormsModule, RouterModule], // Importa módulos necesarios para el template
  templateUrl: './register.component.html', // Ruta al archivo de template HTML
  styleUrl: './register.component.css' // Ruta al archivo de estilos CSS
})
export class RegisterComponent {
  // Objeto para almacenar los datos del formulario de registro
  credentials = {
    nombre: '',
    email: '',
    tipo_de_documento: '',
    documento: '',
    telefono: '',
    eps: '',
    password: ''
  };

  confirmPassword = ''; // <-- Agrega esta línea

  errorMessage = ''; // Mensaje de error para mostrar en el template
  successMessage = ''; // Mensaje de éxito para mostrar en el template

  // Inyecta el servicio de usuario y el router para navegación
  constructor(private userService: UserService, private router: Router) {}

  // Método que se ejecuta al enviar el formulario de registro
  onSubmit() {
    // Llama al servicio para registrar el usuario con los datos del formulario
    this.userService.register(this.credentials).subscribe({
      next: (response) => {
        // Si el registro es exitoso, muestra mensaje de éxito y limpia el mensaje de error
        this.successMessage = 'Registro exitoso. Ahora puedes iniciar sesión.';
        this.errorMessage = '';
        // Redirige al login después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        // Si hay error, muestra mensaje de error y limpia el mensaje de éxito
        this.errorMessage = 'Error al registrar. Intenta nuevamente.';
        this.successMessage = '';
      }
    });
  }
}