import { Component, OnInit } from '@angular/core'; // Importa Component y OnInit de Angular
import { CommonModule } from '@angular/common'; // Importa CommonModule para usar directivas comunes en el template
import { UserService } from '../auth/user.service'; // Importa el servicio de usuario para obtener datos

@Component({
  selector: 'app-profile', // Selector para usar este componente en HTML
  standalone: true, // Indica que es un componente standalone (no necesita módulo)
  imports: [CommonModule], // Importa CommonModule para el template
  templateUrl: './profile.component.html', // Ruta al archivo de template HTML
  styleUrl: './profile.component.css' // Ruta al archivo de estilos CSS
})
export class ProfileComponent implements OnInit {
  usuario: any; // Variable para almacenar los datos del usuario

  // Inyecta el servicio de usuario para obtener los datos del backend
  constructor(private userService: UserService) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    const userId = localStorage.getItem('userId'); // Obtiene el userId almacenado en localStorage
    if (userId) {
      // Si existe userId, obtiene los datos del usuario desde el backend
      this.userService.getUserById(userId).subscribe({
        next: (data: any) => {
          const { historialMedico, ...rest } = data; // Excluye historialMedico de los datos
          this.usuario = rest; // Asigna el resto de los datos al usuario
          console.log('Usuario cargado:', this.usuario); // Muestra los datos en consola para depuración
        },
        error: () => {
          this.usuario = null; // Si hay error, asigna null a usuario
        }
      });
    }
  }
}
