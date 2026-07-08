import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departamento } from '../models/departamento.model';
import { Employee } from '../models/Employee.model';

const API_URL = 'http://localhost:5134/api/departamento';

@Injectable({
  providedIn: 'root',
})
export class DepartamentoService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(API_URL);
  }

  getById(id: number): Observable<Departamento> {
    return this.http.get<Departamento>(`${API_URL}/${id}`);
  }

  getEmpleados(id: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${API_URL}/${id}/empleados`);
  }

  create(departamento: Partial<Departamento>): Observable<Departamento> {
    return this.http.post<Departamento>(API_URL, departamento);
  }

  update(id: number, departamento: Partial<Departamento>): Observable<Departamento> {
    return this.http.put<Departamento>(`${API_URL}/${id}`, departamento);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
