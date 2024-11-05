/* tslint:disable:no-unused-variable */
import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewDepartmentComponent } from './newDepartment.component';

describe('NewDepartmentComponent', () => {
  let component: NewDepartmentComponent;
  let fixture: ComponentFixture<NewDepartmentComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ NewDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
