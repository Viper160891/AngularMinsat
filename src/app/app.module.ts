import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CustomerModule } from './customer/customer.module';
import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import {MatSliderModule} from '@angular/material/slider';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { from } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthHttpInterceptor } from './auth/AuthHttpInterceptor';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderModule } from './order/order.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    CustomerModule,
    OrderModule,
    HomeModule,
    MatSliderModule,    
    FormsModule,ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
    
  ],
  providers: [AuthService,AuthGuard,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthHttpInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
