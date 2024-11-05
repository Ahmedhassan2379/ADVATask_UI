import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../../../../services/DepartmentServices/Department.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-Department',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './update-Department.component.html',
  styleUrls: ['./update-Department.component.css']
})
export class UpdateDepartmentComponent implements OnInit {
  editForm!: FormGroup;
  departmentId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private departService: DepartmentService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.route.url.subscribe((params) => {
      this.departmentId = (params[1].path);
    });
    console.log('departmentId', Number(this.departmentId));
    this.initializeForm();
    this.loadEmployeeData();
  }

  initializeForm() {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      managerId: ['', Validators.required]
    });
  }

  loadEmployeeData() {
    debugger
    this.departService.GetDepartmentById(Number(this.departmentId)).subscribe((depart: any) => {
      console.log('eeeee', depart);
      this.editForm.patchValue({
        name: depart.name,
        managerId: depart.managerId
      });
    });
  }

  onSubmit() {
    debugger
    if (this.editForm.valid) {
      this.departService.updateDepartment(this.editForm.value, Number(this.departmentId)).subscribe({
        next: (res: any) => {
          this.toastr.success(res.message);
          this.router.navigate(['/depart']);
        },
        error: (err: any) => {
          this.toastr.error(err.error.message);
          this.router.navigate(['/depart']);
        }
      });
    }
  }
}
