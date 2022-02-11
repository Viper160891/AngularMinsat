import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddOrEditCustomer } from '../models/AddOrEditCustomer';
import { whiteSpaceValidator } from 'src/app/shared/validators/whiteSpaceValidator';
import { NewCustomerService } from './new-customer.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss'],
  providers:[NewCustomerService]
})
export class NewCustomerComponent implements OnInit {

  newCustomerForm:FormGroup;
  customer:AddOrEditCustomer;

  constructor(private fb:FormBuilder,private service:NewCustomerService,
    public dialogRef:MatDialogRef<NewCustomerComponent>) { }

  ngOnInit() {
    this.buildNewCustomerForm();
  }

  buildNewCustomerForm():void{
    this.newCustomerForm=this.fb.group({
      strNombre:['',[Validators.required]],
      strEmail:['',Validators.compose([Validators.required,whiteSpaceValidator.cannotContainSpace])],
      strIdentificadorFiscal:['',Validators.compose([Validators.required,whiteSpaceValidator.cannotContainSpace])],
      idPais:[0,Validators.compose([Validators.required,whiteSpaceValidator.cannotContainSpace])],
      idRazonSocial:[0,Validators.compose([Validators.required,whiteSpaceValidator.cannotContainSpace])]
    });
  }

  save():void{
    const p=Object.assign({},this.customer,this.newCustomerForm.value);
    if(this.newCustomerForm.dirty && this.newCustomerForm.valid){
      const p= Object.assign({},this.customer,this.newCustomerForm.value);
      this.service.saveCustomer(p).subscribe(
        response=>{
          this.dialogRef.close();
        }
      );
    }else if(!this.newCustomerForm.dirty){
      this.newCustomerForm.reset();
    }

  }

}
