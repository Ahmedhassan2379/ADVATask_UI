import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../../../services/EmployeeServices/Employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-updateEmployee',
  standalone: true,
  imports: [NgIf,NgFor,ReactiveFormsModule],
  templateUrl: './updateEmployee.component.html',
  styleUrls: ['./updateEmployee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  editForm!: FormGroup;
 employeeId!: string;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() { this.route.url.subscribe((params) => {
      this.employeeId = (params[1].path);
    });
    console.log('employeeId', Number(this.employeeId));
    this.initializeForm();
    this.loadEmployeeData();
  }

  initializeForm() {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      salary: ['', Validators.required],
      departmentId: ['', Validators.required],
      managerId: ['', Validators.required]
    });
  }

  loadEmployeeData() {
    debugger
    this.employeeService.GetEmployeeById(Number(this.employeeId)).subscribe((employee: any) => {
      console.log('eeeee',employee);
      this.editForm.patchValue({
        name: employee.name,
        salary: employee.salary,
        departmentId: employee.departmentId,
        managerId: employee.managerId
      });
    });
  }

  onSubmit() {
    debugger
    if (this.editForm.valid) {
      this.employeeService.updateEmployee(this.editForm.value,Number(this.employeeId)).subscribe((res:any) => {
        console.log('Employee updated successfully',res);

      });
      this.router.navigate(['/employee']);
    }
  }

}
