import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/user.service';
import { CitasService } from './citas.service';
import { NgIf, NgFor, DatePipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-ver-citas',
  standalone: true,
  imports: [NgIf, NgFor, DatePipe, JsonPipe],
  templateUrl: './ver-citas.component.html',
  styleUrls: ['./ver-citas.component.css']
})
export class VerCitasComponent implements OnInit {
  userName: string = 'Usuario';
  citas: any[] = [];

  // Diccionarios para mostrar nombres en vez de IDs
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

  constructor(
    private userService: UserService,
    private citasService: CitasService
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      // Obtener nombre del usuario
      this.userService.getUserById(userId).subscribe({
        next: (user) => {
          this.userName = user?.nombre ?? 'Usuario';
        },
        error: () => {
          this.userName = 'Usuario';
        }
      });

      // Obtener citas del usuario
      this.citasService.getCitasByUserId(userId).subscribe({
        next: (citas) => {
          this.citas = citas;
        },
        error: () => {
          this.citas = [];
        }
      });
    }
  }
}
