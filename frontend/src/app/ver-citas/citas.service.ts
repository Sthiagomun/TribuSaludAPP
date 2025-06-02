import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CitasService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Obtener citas por ID de usuario
  getCitasByUserId(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/citas?usuarioId=${userId}`);
  }
}