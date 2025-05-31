import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private apiUrl = 'http://localhost:3000/api/citas';

  constructor(private http: HttpClient) {}

  createCita(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}