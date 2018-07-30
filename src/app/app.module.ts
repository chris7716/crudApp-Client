import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';

import { FormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegModalComponent } from './registration/reg-modal/reg-modal.component';
import { EditRegModalComponent } from './registration/edit-reg-modal/edit-reg-modal.component';
import { AlertComponent } from './registration/alert/alert.component';
//import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegistrationComponent,
    ModalComponent,
    RegModalComponent,
    EditRegModalComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    Angular2FontawesomeModule
  ],
  providers: [],
  entryComponents: [RegModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
