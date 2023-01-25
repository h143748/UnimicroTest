import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module' 

import { AppComponent } from './app.component';

import { JwtInterceptor } from 'src/services/jwtInterceptor';

import { ContactTableComponent } from './components/contact-table/contact-table.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { CreateOrUpdateContactComponent } from './components/create-or-update-contact/create-or-update-contact.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { AsyncPipe, DecimalPipe, NgFor } from '@angular/common';
import { LoginCallbackComponent } from './components/login-callback/login-callback.component';

@NgModule({
  declarations: [
    AppComponent,
    UnauthorizedComponent,
    ContactTableComponent,
    CreateOrUpdateContactComponent,
    LoginCallbackComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NgbModule,
    DecimalPipe, 
    NgFor, 
    AsyncPipe, 
    ReactiveFormsModule, 
    NgbTypeaheadModule,
    NgbPaginationModule

  ],
  providers:[{
    provide:HTTP_INTERCEPTORS,
    useClass:JwtInterceptor,
    multi:true
  },
  DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }