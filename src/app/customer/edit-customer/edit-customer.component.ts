import { Component, OnInit,Inject } from '@angular/core';
import { EditCustomerService } from './edit-customer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddOrEditCustomer } from '../models/AddOrEditCustomer';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { whiteSpaceValidator } from 'src/app/shared/validators/whiteSpaceValidator';


export interface DialogData{
  id:number;
}
@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss'],
  providers:[EditCustomerService]
})
export class EditCustomerComponent implements OnInit {

  newCustomerForm:FormGroup;
  customer:AddOrEditCustomer;
  constructor(private service:EditCustomerService,private fb:FormBuilder,
    public dialogRef:MatDialogRef<EditCustomerComponent>,@Inject(MAT_DIALOG_DATA) public data:DialogData) {
      this.customerRetrieved(data.id);
    }

  ngOnInit(): void {
    this.buildNewCustomerForm();
  }

  buildNewCustomerForm():void{
    this.newCustomerForm=this.fb.group({
      strNombre:['',[Validators.required]],
      strEmail:['',Validators.compose([Validators.required,whiteSpaceValidator.cannotContainSpace])],
      strIdentificadorFiscal:['',Validators.compose([Validators.required,whiteSpaceValidator.cannotContainSpace])],
      idPais:['',Validators.compose([Validators.required,whiteSpaceValidator.cannotContainSpace])],
      idRazonSocial:['',Validators.compose([Validators.required,whiteSpaceValidator.cannotContainSpace])]
    });
  }

  customerRetrieved(id:number):void{
    this.service.getCustomerById(id)
    .subscribe(response=>{
      this.customer=response;
      this.newCustomerForm.patchValue({
        strNombre:response.strNombre,
        strEmail:response.strEmail,
        strIdentificadorFiscal:response.strIdentificadorFiscal,
        idPais:response.idPais,
        idRazonSocial:response.idRazonSocial
      });
    });
  }

  save():void{
    if(this.newCustomerForm.dirty && this.newCustomerForm.valid){
      const p= Object.assign({},this.customer,this.newCustomerForm.value);
      p.id=this.data.id;
      this.service.editCustomer(p).subscribe(
        response=>{
          this.dialogRef.close();
        }
      );
    }else if(!this.newCustomerForm.dirty){
      this.newCustomerForm.reset();
    }
  }

}
