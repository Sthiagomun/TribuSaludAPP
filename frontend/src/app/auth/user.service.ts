import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Login: POST /api/login
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Registro: POST /api/users
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, data);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${id}`);
  }
}