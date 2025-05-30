import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedir-cita',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // <-- Agrega aquí
  templateUrl: './pedir-cita.component.html',
  styleUrls: ['./pedir-cita.component.css']
})
export class PedirCitaComponent {
  appointmentForm: FormGroup;
  doctors = [
    { id: 1, name: 'Dr. Juan Pérez' },
    { id: 2, name: 'Dra. Ana Gómez' },
    { id: 3, name: 'Dr. Carlos Ruiz' }
  ];

  constructor(private fb: FormBuilder) {
    this.appointmentForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      doctor: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.appointmentForm.valid) {
      console.log(this.appointmentForm.value);
      alert('¡Cita solicitada con éxito!');
      this.appointmentForm.reset();
    }
  }
}
