import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyecto } from '../models/proyecto.model';
import { Employee } from '../models/Employee.model';

const API_URL = 'http://localhost:5134/api/proyecto';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(API_URL);
  }

  getActivos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(`${API_URL}/activos`);
  }

  getById(id: number): Observable<Proyecto> {
    return this.http.get<Proyecto>(`${API_URL}/${id}`);
  }

  getEmpleados(id: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${API_URL}/${id}/empleados`);
  }

  create(proyecto: Partial<Proyecto>): Observable<Proyecto> {
    return this.http.post<Proyecto>(API_URL, proyecto);
  }

  update(id: number, proyecto: Partial<Proyecto>): Observable<Proyecto> {
    return this.http.put<Proyecto>(`${API_URL}/${id}`, proyecto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
