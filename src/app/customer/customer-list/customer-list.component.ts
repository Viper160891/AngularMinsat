import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { Customer } from '../models/customer';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import { NewCustomerComponent } from '../new-customer/new-customer.component';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';
import { DetailCustomerComponent } from '../detail-customer/detail-customer.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  providers:[CustomerService]
})
export class CustomerListComponent implements OnInit {

  customers:Customer[]=[];
  numberOfRecords=0;
  pageSizeOptions:number[]=[12,30,50];
  pageSize=12;
  pageIndex=0;
  constructor(private customerService:CustomerService,public dialog: MatDialog) {
    this.getCustomer(1,this.pageSize);
   }

  ngOnInit(): void {
  }

  getCustomer(page:number,rows:number):void{
    this.customerService.getCustomerList(page,rows)
    .subscribe(
      response=> {
        this.customers = response;
        this.numberOfRecords=response[0].totalRecords;
      }
    );

  }
  changuePage(event:any):void{
this.getCustomer(event.pageIndex+1,event.pageSize)

  }

  newCustomer():void{
    const dialogRef = this.dialog.open(NewCustomerComponent, {
      panelClass:"new-customer-modal-dialog"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCustomer(1,this.pageSize);     
    });
  }

  editCustomer(id:number):void{
    const dialogRef=this.dialog.open(EditCustomerComponent, {
      panelClass:"new-customer-modal-dialog",
      data:{id:id}
    });

    dialogRef.afterClosed().subscribe(result=>{
      this.getCustomer(1,this.pageSize);
    });

  }

  viewDetails(id:number):void{
    const dialogRef=this.dialog.open(DetailCustomerComponent, {
      panelClass:"new-customer-modal-dialog",
      data:{id:id}
    });

    dialogRef.afterClosed().subscribe(result=>{
      this.getCustomer(1,this.pageSize);
    });
    
  }

}
