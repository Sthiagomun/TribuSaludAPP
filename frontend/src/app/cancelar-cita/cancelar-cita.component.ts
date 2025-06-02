import { Component, OnInit } from '@angular/core';
import { CitasService } from './citas.service';
import { CommonModule } from '@angular/common'; // <-- Agrega esto

@Component({
  selector: 'app-cancelar-cita',
  templateUrl: './cancelar-cita.component.html',
  styleUrls: ['./cancelar-cita.component.css'],
  standalone: true, // <-- Si usas standalone
  imports: [CommonModule] // <-- Agrega esto
})
export class CancelarCitaComponent implements OnInit {
  citas: any[] = [];
  doctorNombres: { [key: string]: string } = {
    '1': 'Dr. Juan Pérez',
    '2': 'Dra. Ana Gómez',
    '3': 'Dr. Carlos Ruiz',
    '4': 'Dra. Laura Martínez',
    '5': 'Dr. Luis Fernández',
    '6': 'Dra. María López'
  };
  especialidadNombres: { [key: string]: string } = {
    '1': 'Consulta general',
    '2': 'Chequeo anual',
    '3': 'Control de salud',
    '4': 'Consulta especializada',
    '5': 'Seguimiento de tratamiento',
    '6': 'Cita con Optometrista',
    '7': 'Cita con Dentista'
  };

  constructor(private citasService: CitasService) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    console.log('userId:', userId); // <-- Agrega esto
    if (userId) {
      this.citasService.getCitasByUserId(userId).subscribe({
        next: (citas) => {
          console.log('Citas recibidas:', citas); // <-- Agrega esto
          this.citas = citas;
        },
        error: (err) => {
          console.error('Error al obtener citas:', err); // <-- Agrega esto
          this.citas = [];
        }
      });
    }
  }

  cancelarCita(cita: any) {
    if (confirm('¿Estás seguro de cancelar esta cita?')) {
      this.citasService.cancelarCita(cita._id).subscribe({
        next: () => {
          this.citas = this.citas.filter(c => c._id !== cita._id);
          alert('Cita cancelada correctamente');
        },
        error: () => alert('No se pudo cancelar la cita')
      });
    }
  }
}
