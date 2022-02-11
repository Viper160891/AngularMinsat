import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddOrEditCustomer } from '../models/AddOrEditCustomer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetailCustomerService {

  constructor(private http:HttpClient) { }

  getCustomerById(int:number):Observable<AddOrEditCustomer>{
    return this.http.get<AddOrEditCustomer>(`${environment.urlService}/clientes/${int}`);
  }
}
