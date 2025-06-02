import { Router } from '@angular/router'; // Importa Router para navegación entre rutas
import { Component } from '@angular/core'; // Importa Component para definir el componente
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa módulos y clases para formularios reactivos
import { CommonModule } from '@angular/common'; // Importa CommonModule para directivas comunes de Angular
import { AppointmentService } from './appointment.service'; // Importa el servicio para manejar las citas

@Component({
  selector: 'app-pedir-cita', // Selector para usar este componente en HTML
  standalone: true, // Indica que es un componente standalone (no necesita módulo)
  imports: [CommonModule, ReactiveFormsModule], // Importa módulos necesarios para el template
  templateUrl: './pedir-cita.component.html', // Ruta al archivo de template HTML
  styleUrls: ['./pedir-cita.component.css'] // Ruta al archivo de estilos CSS
})
export class PedirCitaComponent {
  appointmentForm: FormGroup; // Formulario reactivo para solicitar cita

  // Lista de doctores disponibles para seleccionar en el formulario
  doctors = [
    { id: 1, name: 'Dr. Juan Pérez' },
    { id: 2, name: 'Dra. Ana Gómez' },
    { id: 3, name: 'Dr. Carlos Ruiz' },
    { id: 4, name: 'Dra. Laura Martínez' },
    { id: 5, name: 'Dr. Luis Fernández' },
    { id: 6, name: 'Dra. María López' }
  ];

  // Lista de razones o especialidades para la cita
  reasons = [
    { id: 1, name: 'Consulta general' },
    { id: 2, name: 'Chequeo anual' },
    { id: 3, name: 'Control de salud' },
    { id: 4, name: 'Consulta especializada' },
    { id: 5, name: 'Seguimiento de tratamiento' },
    { id: 6, name: 'Cita con Optometrista' },
    { id: 7, name: 'Cita con Dentista' }
  ];

  successMessage = ''; // Mensaje de éxito al solicitar la cita
  errorMessage = ''; // Mensaje de error al solicitar la cita

  // Inyecta FormBuilder para construir el formulario, AppointmentService para manejar las citas y Router para navegación
  constructor(private fb: FormBuilder, private appointmentService: AppointmentService, private router: Router) {
    // Inicializa el formulario con los campos y validaciones necesarias
    this.appointmentForm = this.fb.group({
      date: ['', Validators.required], // Campo para la fecha de la cita
      time: ['', Validators.required], // Campo para la hora de la cita
      doctor: ['', Validators.required], // Campo para seleccionar el doctor
      reason: ['', Validators.required], // Campo para seleccionar la razón o especialidad
      observaciones: [''] // Campo opcional para observaciones adicionales
    });
  }

  // Método que se ejecuta al enviar el formulario
  submitForm() {
    this.successMessage = '';
    this.errorMessage = '';
    if (this.appointmentForm.valid) { // Verifica que el formulario sea válido
      const userId = localStorage.getItem('userId'); // Obtiene el userId del localStorage

      // Prepara los datos para coincidir con el backend
      const cita = {
        usuarioId: userId, // ID del usuario que solicita la cita
        fecha: this.appointmentForm.value.date, // Fecha seleccionada
        hora: this.appointmentForm.value.time, // Hora seleccionada
        doctor: this.appointmentForm.value.doctor, // Doctor seleccionado
        especialidad: this.appointmentForm.value.reason, // Razón o especialidad seleccionada
        informacionAdicional: this.appointmentForm.value.observaciones // Observaciones adicionales
      };

      // Llama al servicio para crear la cita
      this.appointmentService.createCita(cita).subscribe({
        next: () => {
          this.successMessage = '¡Cita solicitada con éxito!'; // Muestra mensaje de éxito
          this.appointmentForm.reset(); // Limpia el formulario
          setTimeout(() => {
              this.router.navigate(['/ver-citas']); // Redirige a la página de ver citas después de 1.5 segundos
          }, 1500);
        },
        error: () => {
          this.errorMessage = 'Ocurrió un error al solicitar la cita.'; // Muestra mensaje de error si falla la solicitud
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos obligatorios.'; // Muestra mensaje si faltan campos obligatorios
    }
  }
}
