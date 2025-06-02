import { Injectable } from '@angular/core'; // Importa el decorador Injectable para servicios de Angular
import { HttpClient } from '@angular/common/http'; // Importa HttpClient para hacer peticiones HTTP
import { Observable } from 'rxjs'; // Importa Observable para manejar respuestas asíncronas

@Injectable({ providedIn: 'root' }) // Hace que el servicio esté disponible en toda la aplicación
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users/'; // URL base para las peticiones al backend

  constructor(private http: HttpClient) {} // Inyecta HttpClient para usarlo en los métodos

  // Método para iniciar sesión: realiza una petición POST a /api/users/login con las credenciales
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}login`, credentials);
  }

  // Método para registrar un usuario: realiza una petición POST a /api/users con los datos del usuario
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data); // Usa solo this.apiUrl, sin agregar /users
  }

  // Método para obtener un usuario por su ID: realiza una petición GET a /api/users/:id
  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}`);
  }

  // Método para actualizar un usuario: realiza una petición PUT a /api/users/:id con los nuevos datos
  updateUser(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}`, data); // Elimina el /users extra
  }

  // Método para obtener el perfil del usuario (puede requerir autenticación)
  getPerfil(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}