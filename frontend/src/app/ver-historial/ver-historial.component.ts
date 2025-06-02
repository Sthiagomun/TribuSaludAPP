import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-ver-historial',
  templateUrl: './ver-historial.component.html',
  styleUrls: ['./ver-historial.component.css']
})
export class VerHistorialComponent implements OnInit {
  historialMedico: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: (user) => {
          this.historialMedico = user.historialMedico || 'No hay historial médico disponible. Agrega tu historial en actualizar datos o espera a que el doctor lo agregue por ti.';
        },
        error: () => {
          this.historialMedico = 'Error al cargar el historial médico.';
        }
      });
    }
  }
}
