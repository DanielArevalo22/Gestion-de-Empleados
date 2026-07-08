import { Component, OnInit, inject, signal } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { NgIf, NgFor, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/Employee.model';
import { Departamento } from '../../models/departamento.model';
import { DepartamentoService } from '../../services/departamento';
import { EmpleadoService } from '../../services/empleado';

@Component({
  selector: 'app-employees',
  imports: [Header, Footer, NgIf, NgFor, DecimalPipe, FormsModule],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees implements OnInit {

  private readonly departamentoService = inject(DepartamentoService);
  private readonly empleadoService = inject(EmpleadoService);

  protected readonly activateForm = signal(false);
  protected readonly departamentos = signal<Departamento[]>([]);
  protected readonly employees = signal<Employee[]>([]);
  protected readonly modoEdicion = signal(false);
  protected readonly empleadoDetalle = signal<Employee | null>(null);

  private empleadoEditId: number | null = null;

  protected nuevoEmpleado = {
    nombres: '',
    apellidos: '',
    cargo: '',
    sueldo: 0,
    fechaNacimiento: '',
    idDepartamento: 0,
  };

  ngOnInit(): void {
    this.cargarEmpleados();

    this.departamentoService.getAll().subscribe({
      next: (departamentos) => this.departamentos.set(departamentos),
      error: (err) => console.error('No se pudo cargar los departamentos', err),
    });
  }

  private cargarEmpleados(): void {
    this.empleadoService.getAll().subscribe({
      next: (employees) => this.employees.set(employees),
      error: (err) => console.error('No se pudo cargar los empleados', err),
    });
  }

  protected nombreDepartamento(idDepartamento: number): string {
    return this.departamentos().find(d => d.idDepartamento === idDepartamento)?.departamento ?? '—';
  }

  showCreatePr(){
    if (this.activateForm()) {
      this.cancelarFormulario();
      return;
    }
    this.activateForm.set(true);
  }

  private cancelarFormulario(): void {
    this.activateForm.set(false);
    this.modoEdicion.set(false);
    this.empleadoEditId = null;
    this.nuevoEmpleado = { nombres: '', apellidos: '', cargo: '', sueldo: 0, fechaNacimiento: '', idDepartamento: 0 };
  }

  crearEmpleado(): void {
    if (this.modoEdicion() && this.empleadoEditId !== null) {
      this.empleadoService.update(this.empleadoEditId, this.nuevoEmpleado).subscribe({
        next: () => {
          this.cargarEmpleados();
          this.cancelarFormulario();
        },
        error: (err) => console.error('No se pudo actualizar el empleado', err),
      });
      return;
    }

    this.empleadoService.create({ ...this.nuevoEmpleado, activo: true }).subscribe({
      next: () => {
        this.cargarEmpleados();
        this.cancelarFormulario();
      },
      error: (err) => console.error('No se pudo crear el empleado', err),
    });
  }

  verEmpleado(e: Employee): void {
    this.empleadoDetalle.set(e);
  }

  cerrarDetalle(): void {
    this.empleadoDetalle.set(null);
  }

  editarEmpleado(e: Employee): void {
    this.modoEdicion.set(true);
    this.empleadoEditId = e.idEmpleado;
    this.nuevoEmpleado = {
      nombres: e.nombres,
      apellidos: e.apellidos,
      cargo: e.cargo,
      sueldo: e.sueldo,
      fechaNacimiento: e.fechaNacimiento,
      idDepartamento: e.idDepartamento,
    };
    this.activateForm.set(true);
  }

  eliminarEmpleado(e: Employee): void {
    const confirmado = confirm(`¿Eliminar al empleado ${e.nombres} ${e.apellidos}?`);
    if (!confirmado) return;

    this.empleadoService.delete(e.idEmpleado).subscribe({
      next: () => this.cargarEmpleados(),
      error: (err) => console.error('No se pudo eliminar el empleado', err),
    });
  }

}
