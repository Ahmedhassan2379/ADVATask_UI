import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeService } from '../../services/EmployeeServices/Employee.service';
import { DepartmentService } from '../../services/DepartmentServices/Department.service';
import { EmployeeModel } from '../../interfaces/EmployeeModel';
import { NgFor, NgIf } from '@angular/common';
import { DepartmentModel } from '../../interfaces/DepartmentModel';
import { FullEmployee } from '../../interfaces/fullEmployee';
import { ToastrService,ToastNoAnimation } from 'ngx-toastr';
import { CreateEmployeeComponent } from './newEmployee/CreateEmployee/CreateEmployee.component';
import { PaginationComponent } from '../shared/pagination/pagination/pagination.component';
import { UpdateEmployeeComponent } from './updateEmployee/updateEmployee/updateEmployee.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-Employee',
  standalone: true,
  imports: [NgFor,NgIf,RouterLink,CreateEmployeeComponent,PaginationComponent,UpdateEmployeeComponent],
  templateUrl: './Employee.component.html',
  styleUrls: ['./Employee.component.css']
})
export class EmployeeComponent implements OnInit {

  oldEmployee:any
  employees:FullEmployee[]=[]
  departments:any[]=[]
  currentPage = 1;
  pageSize = 3;
  pageNumber=1;
  totalPages = 0;
  addedMessage:string='';
  updatedEmployeeId:number=0;
  departmentId!:number;

  constructor(private EmployeeService:EmployeeService,
    private DepartmentService:DepartmentService,
  private toastr:ToastrService,
private router:Router) { }

  ngOnInit() {
    this.getEmployees();
    this.getDepartments();
  }
  getEmployees(){
    debugger
    this.EmployeeService.getAllEmployees().subscribe((res:any)=>{
      console.log(res.mapEmployees);
      this.employees=res.mapEmployees;
      this.totalPages = (res.count/this.pageSize);
      console.log(this.totalPages);
    })
  }
  getDepartments(){
    this.DepartmentService.getAllDepartments().subscribe((res:any)=>{
      console.log(res);
      this.departments=res;
    })
  }

  filterEmployees(departId:number){
    this.departmentId = departId
    debugger
    this.EmployeeService.getAllEmployees(this.pageNumber,this.pageSize,departId).subscribe((res:any)=>{
      console.log(res);
      this.employees=res.mapEmployees;
      this.totalPages = (res.count/this.pageSize);
    })

  }

  addEmployee(employee:EmployeeModel){
    this.EmployeeService.CreateEmployee(employee).subscribe((res:any)=>{
      console.log('re',res);
      this.toastr.success(res.message);
    })
    this.getEmployees();
  }

  editEmployee(id:number){
    debugger
    this.updatedEmployeeId=id;
    this.router.navigate(['/updateEmployee',id]);
    // this.EmployeeService.updateEmployee(employee,employee.id).subscribe((res:any)=>{
    //   console.log('re',res);
    //   this.toastr.success(res.message);
    // })
    // this.getEmployees();
  }

  removeEmployee(id:number){
    debugger
    alert('Are you sure you want to delete this employee?');
    this.EmployeeService.DeleteEmployee(id).subscribe({
      next: (res:any) => {
        this.toastr.success(res.message);
        this.getEmployees();
      }
    })
  }

   openModal() {
    const modal = document.getElementById('employeeModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  handleEmployeeCreated(employee: any) {
    this.EmployeeService.CreateEmployee(employee).subscribe((res:any)=>{
      console.log('re',res.message);
      this.addedMessage=res.message;
      this.toastr.info(this.addedMessage,'Employee Added Successfully');
      this.getEmployees();
    })
  }

  onPageChange(newPage: number): void {
    debugger
    this.currentPage = newPage;
    this.EmployeeService.getAllEmployees(this.currentPage,this.pageSize,this.departmentId).subscribe((response: any) => {
      this.employees = response.mapEmployees;
      this.totalPages = response.count/this.pageSize;  
      })
  }
  onPageChangeAfterFilterByDepartment(newPage: number): void {
    debugger
    this.currentPage = newPage;
    this.EmployeeService.getAllEmployees(this.currentPage,this.pageSize,this.departmentId).subscribe((response: any) => {
      this.employees = response.mapEmployees;
      this.totalPages = response.count/this.pageSize;  
      })
  }
}
