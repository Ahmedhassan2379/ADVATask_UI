import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-newDepartment',
  standalone: true,
  imports: [NgIf,NgFor,ReactiveFormsModule],
  templateUrl: './newDepartment.component.html',
  styleUrls: ['./newDepartment.component.css']
})
export class NewDepartmentComponent implements OnInit {

  departForm: FormGroup;
  @Output() departCreated = new EventEmitter<any>();
  
  constructor(private fb: FormBuilder) {
    this.departForm = this.fb.group({
      name: ['', Validators.required],
      managerId: ['',[Validators.required,Validators.pattern('^[0-9]+$')]],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    debugger
    if (this.departForm.valid) {
      this.departCreated.emit(this.departForm.value);
      this.departForm.reset();
      this.closeModal();
    }
  }

  closeModal() {
    const modal = document.getElementById('departModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
}
