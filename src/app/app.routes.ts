import { Routes } from '@angular/router';
import { EmployeeComponent } from './components/Employee/Employee.component';
import { DepartmentComponent } from './components/Department/Department.component';
import { HomeComponent } from './components/Home/home/home.component';
import { NewDepartmentComponent } from './components/Department/newDepartment/newDepartment/newDepartment.component';
import { UpdateEmployeeComponent } from './components/Employee/updateEmployee/updateEmployee/updateEmployee.component';
import { UpdateDepartmentComponent } from './components/Department/updateDepartment/update-Department/update-Department.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'addDepart', component: NewDepartmentComponent },
    { path: 'employee', component: EmployeeComponent },
    { path: 'depart', component: DepartmentComponent },
    { path: 'updateEmployee/:id', component: UpdateEmployeeComponent },
    { path: 'updatedepart/:id', component: UpdateDepartmentComponent }
];
