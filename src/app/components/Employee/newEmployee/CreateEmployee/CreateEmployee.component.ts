import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import bootstrap from '../../../../../main.server';
import { NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-CreateEmployee',
  standalone: true,
  imports: [NgFor,NgIf,ReactiveFormsModule],
  templateUrl: './CreateEmployee.component.html',
  styleUrls: ['./CreateEmployee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  @Output() employeeCreated = new EventEmitter<any>();

  employeeForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      managerId: ['', Validators.required],
      salary:['', Validators.required],
      departmentId: ['', [Validators.required, Validators.required]]
    });
  }
  ngOnInit() {
    
  }
  onSubmit() {
    debugger
    if (this.employeeForm.valid) {
      this.employeeCreated.emit(this.employeeForm.value);
      this.employeeForm.reset();
      this.closeModal();
    }
  }

  clearForm() {
    // this.employee = { name: '', position: '' };
  }

  closeModal() {
    const modal = document.getElementById('employeeModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }


}
