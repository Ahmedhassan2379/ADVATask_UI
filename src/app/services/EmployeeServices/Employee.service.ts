import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeModel } from '../../interfaces/EmployeeModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  EmployeeBaseUrl:string ='https://localhost:7203/api/Employee/';
  constructor(private http:HttpClient) {

   }

   getAllEmployees(pageNumber?:number,pageSize?:number,departmentId?:number){
    if(!pageNumber&&!pageSize&&!departmentId){
      return this.http.get(this.EmployeeBaseUrl+'AllEmployees');
    }
    else if(pageNumber && pageSize &&!departmentId){
      return this.http.get(this.EmployeeBaseUrl+'AllEmployees?pageNumber='+pageNumber+'&pageSize='+pageSize);

    }else if(departmentId && !pageNumber && !pageNumber){
      return this.http.get(this.EmployeeBaseUrl+'AllEmployees?departmentId='+departmentId);
    }
    return this.http.get(this.EmployeeBaseUrl+'AllEmployees?pageNumber='+pageNumber+'&pageSize='+pageSize+'&departmentId='+departmentId);
   }

   GetEmployeeById(id:number){
    debugger
    var res =  this.http.get(this.EmployeeBaseUrl+'GetEmployee?id='+id);
    res.subscribe((res:any)=>{
      console.log(res);
    })
    return res
   }

   CreateEmployee(employee:EmployeeModel){
    return this.http.post(this.EmployeeBaseUrl+'NewEmployee',employee);
   }

   updateEmployee(employee:EmployeeModel,id:number){
    return this.http.put(this.EmployeeBaseUrl+'EditeEmployee?id='+id,employee);
   }
   DeleteEmployee(id:number){
    return this.http.delete(this.EmployeeBaseUrl+'RemoveEmployee?id='+id);
   }

   getEmployeesByDepartment(departId:number){
    return this.http.get(this.EmployeeBaseUrl+'GetEmployeesByDepartment?departId='+departId);
   }

   GetEmployeesPagination(page:number,pageSize:number){
    return this.http.get(this.EmployeeBaseUrl+'AllEmployees?page='+page+'&pageSize='+pageSize);
   }
}
