import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { Role } from '../auth/role.enum';
import { OrderContainerComponent } from './order-container/order-container.component';

const orderRoutes:Routes=[
  {
    path:'',
    children:[
      {
        path:'',
        component:OrderContainerComponent
      }
    ],
    canActivate:[AuthGuard],
    data:{expectedRole:Role.Admin}
  }
  ];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forChild(orderRoutes)
  ],
  exports:[RouterModule]
})
export class OrderRoutingModule { }
