import { NgFor } from '@angular/common';
import { Component, model, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/EmployeeServices/Employee.service';
import { DepartmentService } from '../../services/DepartmentServices/Department.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewDepartmentComponent } from './newDepartment/newDepartment/newDepartment.component';
import { DepartmentModel } from '../../interfaces/DepartmentModel';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-Department',
  standalone: true,
  imports: [NgFor, RouterLink, NewDepartmentComponent],
  templateUrl: './Department.component.html',
  styleUrls: ['./Department.component.css']
})
export class DepartmentComponent implements OnInit {

  departments: any[] = [];
  addedMessage: string = '';
  constructor(private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private router: Router,
    private toastr: ToastrService) { }
  ngOnInit() {
    this.getAllDepartments();
  }

  getAllDepartments() {
    return this.departmentService.getAllDepartments().subscribe((res: any) => {
      console.log(res);
      this.departments = res;
    })
  }

  removeDepart(item: any) {
    debugger
    this.departmentService.DeleteDepartment(item.id).subscribe((res: any) => {
      this.toastr.success('Department Deleted Successfully');
      this.getAllDepartments();
    })
  }

  updateDepart(item: any) {
    debugger
    this.router.navigate(['/updatedepart',item.id]);
  }

  openModal() {
    debugger
    const modal = document.getElementById('departModal');
    const modalEmployee = document.getElementById('employeeModal');
    if (modal) {
      modal.style.display = 'block';
    }

  }

  handleDepartCreated(depart: DepartmentModel) {
    debugger
    if (depart.managerId)
      this.departmentService.CreateDepartment(depart).subscribe({
        next: (res: any) => {
          this.toastr.success('Department Created Successfully');
          this.getAllDepartments();
        },
        error: (err: any) => {
          this.toastr.error('Error Creating Department ,manager must be in just one department');
        }
      });
  }


}
