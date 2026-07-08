import { Component, OnInit, inject, signal } from '@angular/core';
import { Card } from '../card/card';
import { InfoList } from "../info-list/info-list";
import { ProjectsTable } from '../projects-table/projects-table';
import { RecentAssignments } from '../recent-assignments/recent-assignments';
import { ProyectoService } from '../../services/proyecto';
import { EmpleadoService } from '../../services/empleado';

@Component({
  selector: 'app-body',
  imports: [Card, InfoList, ProjectsTable, RecentAssignments],
  templateUrl: './body.html',
  styleUrl: './body.css',
})
export class Body implements OnInit {
  private readonly proyectoService = inject(ProyectoService);
  private readonly empleadoService = inject(EmpleadoService);

  protected readonly totalProyectos = signal<number | null>(null);
  protected readonly totalEmpleados = signal<number | null>(null);

  ngOnInit(): void {
    this.proyectoService.getAll().subscribe({
      next: (proyectos) => this.totalProyectos.set(proyectos.length),
      error: (err) => console.error('No se pudo cargar los proyectos', err),
    });

    this.empleadoService.getAll().subscribe({
      next: (empleados) => this.totalEmpleados.set(empleados.length),
      error: (err) => console.error('No se pudo cargar los empleados', err),
    });
  }
}
