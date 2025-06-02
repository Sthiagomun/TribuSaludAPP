import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Importa esto
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-profile',
  standalone: true, // <-- Asegúrate de tener esto
  imports: [CommonModule], // <-- Agrega esto
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  usuario: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId'); // Asegúrate de guardar el id así al hacer login
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: (data: any) => {
          const { historialMedico, ...rest } = data;
          this.usuario = rest;
          console.log('Usuario cargado:', this.usuario); // <-- Agrega esto
        },
        error: () => {
          this.usuario = null;
        }
      });
    }
  }
}
