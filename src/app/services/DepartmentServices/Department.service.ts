import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DepartmentModel } from '../../interfaces/DepartmentModel';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  debartBaseUrl:string ='https://localhost:7203/api/Department/';
  constructor(private http:HttpClient) {

   }

   getAllDepartments(){
    return this.http.get(this.debartBaseUrl+'AllDepartments');
   }

   GetDepartmentById(id:number){
    return this.http.get(this.debartBaseUrl+'GetDepartment?id='+id);
   }

   CreateDepartment(depart:DepartmentModel){
    return this.http.post(this.debartBaseUrl+'NewDepartment',depart);
   }

   updateDepartment(depart:DepartmentModel,id:number){
    return this.http.put(this.debartBaseUrl+'EditeDepartment?id='+id,depart);
   }
   DeleteDepartment(id:number){
    return this.http.delete(this.debartBaseUrl+'RemoveDepartment?id='+id);
   }
}
