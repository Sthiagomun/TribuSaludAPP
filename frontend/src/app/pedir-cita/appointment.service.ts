import { Injectable } from '@angular/core'; // Importa Injectable para definir servicios en Angular
import { HttpClient } from '@angular/common/http'; // Importa HttpClient para hacer peticiones HTTP
import { Observable } from 'rxjs'; // Importa Observable para manejar respuestas asíncronas

@Injectable({ providedIn: 'root' }) // Hace que el servicio esté disponible en toda la aplicación
export class AppointmentService {
  private apiUrl = 'http://localhost:3000/api/citas'; // URL base para las peticiones al backend de citas

  // Inyecta HttpClient para usarlo en los métodos del servicio
  constructor(private http: HttpClient) {}

  // Método para crear una nueva cita: realiza una petición POST al backend con los datos de la cita
  createCita(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}