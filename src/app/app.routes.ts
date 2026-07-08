import { Routes } from '@angular/router';
import { Employees } from './pages/employees/employees';
import { Home } from './pages/home/home';
import { Projects } from './pages/projects/projects';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'employees', component: Employees},
    {path: 'projects', component: Projects}
];
