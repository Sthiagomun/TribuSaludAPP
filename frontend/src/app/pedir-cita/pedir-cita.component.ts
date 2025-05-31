import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppointmentService } from './appointment.service';

@Component({
  selector: 'app-pedir-cita',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pedir-cita.component.html',
  styleUrls: ['./pedir-cita.component.css']
})
export class PedirCitaComponent {
  appointmentForm: FormGroup;
  doctors = [
    { id: 1, name: 'Dr. Juan Pérez' },
    { id: 2, name: 'Dra. Ana Gómez' },
    { id: 3, name: 'Dr. Carlos Ruiz' },
    { id: 4, name: 'Dra. Laura Martínez' },
    { id: 5, name: 'Dr. Luis Fernández' },
    { id: 6, name: 'Dra. María López' }
  ];
  reasons = [
    { id: 1, name: 'Consulta general' },
    { id: 2, name: 'Chequeo anual' },
    { id: 3, name: 'Control de salud' },
    { id: 4, name: 'Consulta especializada' },
    { id: 5, name: 'Seguimiento de tratamiento' },
    { id: 6, name: 'Cita con Optometrista' },
    { id: 7, name: 'Cita con Dentista' }
  ];

  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private appointmentService: AppointmentService) {
    this.appointmentForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      doctor: ['', Validators.required],
      reason: ['', Validators.required],
      optionalInfo: ['']
    });
  }

  submitForm() {
    this.successMessage = '';
    this.errorMessage = '';
    if (this.appointmentForm.valid) {
      // Prepara los datos para coincidir con el backend
      const cita = {
        usuarioId: 'ID_DEL_USUARIO', // Reemplaza esto por el ID real del usuario logueado
        fecha: this.appointmentForm.value.date,
        hora: this.appointmentForm.value.time,
        doctor: this.appointmentForm.value.doctor,
        especialidad: this.appointmentForm.value.reason,
        informacionAdicional: this.appointmentForm.value.optionalInfo
      };
      this.appointmentService.createCita(cita).subscribe({
        next: () => {
          this.successMessage = '¡Cita solicitada con éxito!';
          this.appointmentForm.reset();
        },
        error: () => {
          this.errorMessage = 'Ocurrió un error al solicitar la cita.';
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos obligatorios.';
    }
  }
}
