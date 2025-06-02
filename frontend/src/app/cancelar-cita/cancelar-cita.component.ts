import { Component, OnInit } from '@angular/core'; // Importa Component y OnInit de Angular
import { CitasService } from './citas.service'; // Importa el servicio para manejar las citas
import { CommonModule } from '@angular/common'; // Importa CommonModule para directivas comunes de Angular

@Component({
  selector: 'app-cancelar-cita', // Selector para usar este componente en HTML
  templateUrl: './cancelar-cita.component.html', // Ruta al archivo de template HTML
  styleUrls: ['./cancelar-cita.component.css'], // Ruta al archivo de estilos CSS
  standalone: true, // Indica que es un componente standalone (no necesita módulo)
  imports: [CommonModule] // Importa CommonModule para usar directivas como *ngIf y *ngFor
})
export class CancelarCitaComponent implements OnInit {
  citas: any[] = []; // Arreglo para almacenar las citas del usuario

  // Diccionario para mostrar nombres de doctores según su ID
  doctorNombres: { [key: string]: string } = {
    '1': 'Dr. Juan Pérez',
    '2': 'Dra. Ana Gómez',
    '3': 'Dr. Carlos Ruiz',
    '4': 'Dra. Laura Martínez',
    '5': 'Dr. Luis Fernández',
    '6': 'Dra. María López'
  };

  // Diccionario para mostrar nombres de especialidades según su ID
  especialidadNombres: { [key: string]: string } = {
    '1': 'Consulta general',
    '2': 'Chequeo anual',
    '3': 'Control de salud',
    '4': 'Consulta especializada',
    '5': 'Seguimiento de tratamiento',
    '6': 'Cita con Optometrista',
    '7': 'Cita con Dentista'
  };

  // Inyecta el servicio de citas para obtener y cancelar citas
  constructor(private citasService: CitasService) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    const userId = localStorage.getItem('userId'); // Obtiene el userId del localStorage
    console.log('userId:', userId); // Muestra el userId en consola para depuración
    if (userId) {
      // Si hay userId, obtiene las citas del usuario
      this.citasService.getCitasByUserId(userId).subscribe({
        next: (citas) => {
          console.log('Citas recibidas:', citas); // Muestra las citas recibidas en consola
          this.citas = citas; // Asigna las citas al arreglo local
        },
        error: (err) => {
          console.error('Error al obtener citas:', err); // Muestra error en consola si falla la petición
          this.citas = []; // Deja el arreglo vacío si hay error
        }
      });
    }
  }

  // Método para cancelar una cita específica
  cancelarCita(cita: any) {
    // Pregunta al usuario si está seguro de cancelar la cita
    if (confirm('¿Estás seguro de cancelar esta cita?')) {
      // Llama al servicio para cancelar la cita por su ID
      this.citasService.cancelarCita(cita._id).subscribe({
        next: () => {
          // Si la cancelación es exitosa, elimina la cita del arreglo local
          this.citas = this.citas.filter(c => c._id !== cita._id);
          alert('Cita cancelada correctamente'); // Muestra mensaje de éxito
        },
        error: () => alert('No se pudo cancelar la cita') // Muestra mensaje de error si falla la cancelación
      });
    }
  }
}
