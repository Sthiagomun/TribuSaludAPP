import { Component, OnInit } from '@angular/core'; // Importa Component y OnInit de Angular
import { UserService } from '../auth/user.service'; // Importa el servicio de usuario para obtener datos

@Component({
  selector: 'app-ver-historial', // Selector para usar este componente en HTML
  templateUrl: './ver-historial.component.html', // Ruta al archivo de template HTML
  styleUrls: ['./ver-historial.component.css'] // Ruta al archivo de estilos CSS
})
export class VerHistorialComponent implements OnInit {
  historialMedico: string = ''; // Variable para almacenar el historial médico del usuario

  // Inyecta el servicio de usuario para obtener los datos del backend
  constructor(private userService: UserService) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    const userId = localStorage.getItem('userId'); // Obtiene el userId almacenado en localStorage
    if (userId) {
      // Si existe userId, obtiene los datos del usuario desde el backend
      this.userService.getUserById(userId).subscribe({
        next: (user) => {
          // Asigna el historial médico si existe, si no muestra un mensaje informativo
          this.historialMedico = user.historialMedico || 'No hay historial médico disponible. Agrega tu historial en actualizar datos o espera a que el doctor lo agregue por ti.';
        },
        error: () => {
          // Si hay error al obtener los datos, muestra un mensaje de error
          this.historialMedico = 'Error al cargar el historial médico.';
        }
      });
    }
  }
}
