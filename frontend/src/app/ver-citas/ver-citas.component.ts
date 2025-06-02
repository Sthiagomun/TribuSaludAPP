import { Component, OnInit } from '@angular/core'; // Importa Component y OnInit de Angular
import { UserService } from '../auth/user.service'; // Importa el servicio de usuario para obtener datos del usuario
import { CitasService } from './citas.service'; // Importa el servicio de citas para obtener las citas del usuario
import { NgIf, NgFor, DatePipe } from '@angular/common'; // Importa directivas y pipes comunes de Angular

@Component({
  selector: 'app-ver-citas', // Selector para usar este componente en HTML
  standalone: true, // Indica que es un componente standalone (no necesita módulo)
  imports: [NgIf, NgFor, DatePipe], // Importa módulos y pipes necesarios para el template
  templateUrl: './ver-citas.component.html', // Ruta al archivo de template HTML
  styleUrls: ['./ver-citas.component.css'] // Ruta al archivo de estilos CSS
})
export class VerCitasComponent implements OnInit {
  userName: string = 'Usuario'; // Variable para mostrar el nombre del usuario
  citas: any[] = []; // Arreglo para almacenar las citas del usuario

  // Diccionario para mostrar nombres de doctores en vez de IDs
  doctorNombres: { [key: string]: string } = {
    '1': 'Dr. Juan Pérez',
    '2': 'Dra. Ana Gómez',
    '3': 'Dr. Carlos Ruiz',
    '4': 'Dra. Laura Martínez',
    '5': 'Dr. Luis Fernández',
    '6': 'Dra. María López'
  };

  // Diccionario para mostrar nombres de especialidades en vez de IDs
  especialidadNombres: { [key: string]: string } = {
    '1': 'Consulta general',
    '2': 'Chequeo anual',
    '3': 'Control de salud',
    '4': 'Consulta especializada',
    '5': 'Seguimiento de tratamiento',
    '6': 'Cita con Optometrista',
    '7': 'Cita con Dentista'
  };

  // Inyecta los servicios necesarios para obtener datos del usuario y sus citas
  constructor(
    private userService: UserService,
    private citasService: CitasService
  ) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    const userId = localStorage.getItem('userId'); // Obtiene el userId almacenado en localStorage
    if (userId) {
      // Obtener nombre del usuario desde el backend
      this.userService.getUserById(userId).subscribe({
        next: (user) => {
          this.userName = user?.nombre ?? 'Usuario'; // Asigna el nombre del usuario o 'Usuario' si no existe
        },
        error: () => {
          this.userName = 'Usuario'; // Si hay error, asigna 'Usuario'
        }
      });

      // Obtener citas del usuario desde el backend
      this.citasService.getCitasByUserId(userId).subscribe({
        next: (citas) => {
          this.citas = citas; // Asigna las citas recibidas al arreglo local
        },
        error: () => {
          this.citas = []; // Si hay error, deja el arreglo vacío
        }
      });
    }
  }
}
