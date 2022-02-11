import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddOrEditCustomer } from '../models/AddOrEditCustomer';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditCustomerService {

  constructor(private http:HttpClient) { }

  getCustomerById(int:number):Observable<AddOrEditCustomer>{
    return this.http.get<AddOrEditCustomer>(`${environment.urlService}/clientes/${int}`);
  }

  editCustomer(data:AddOrEditCustomer):Observable<Response>{
    return this.http.put(`${environment.urlService}/clientes`,data).
    pipe(map((response:any)=>response));
  }
}
