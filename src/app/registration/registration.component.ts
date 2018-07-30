import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { EditRegModalComponent } from './edit-reg-modal/edit-reg-modal.component';
import { ViewChild } from '@angular/core';
import { RegModalComponent } from 'src/app/registration/reg-modal/reg-modal.component';
import { TemplateRef } from '@angular/core';
import { NgModule } from '@angular/core';

//Registratioin model class
class Registration {
  constructor(
    public id: number,
    public firstName: string = '',
    public lastName: string = '',
    public dob: NgbDateStruct = null,
    public email: string = '',
    public password: string = '',
    public country: string = 'Select country'
  ) { }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  // It maintains list of Registrations
  registrations: Registration[] = [];
  // It maintains registration Model
  regModel: Registration;
  // It maintains registration form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'Save';
  // It maintains table row index based on selection.
  selectedRow: number;
  // It maintains Array of countries.
  countries: string[] = ['US', 'UK', 'India', 'UAE'];

  constructor() {
    this.registrations.push(new Registration(1, 'Johan', 'Peter', { year: 1980, month: 5, day: 12 }, 'johan@gmail.com', 'johan123', 'UK'));
    this.registrations.push(new Registration(2, 'Hasitha', 'Kaushan', { year: 1975, month: 12, day: 3 }, 'hasitha@gmail.com', 'tariq123', 'SRI LANKA'));
    this.registrations.push(new Registration(3, 'Nirmal', 'Kumar', { year: 1970, month: 7, day: 25 }, 'nirmal@gmail.com', 'nirmal123', 'India'));
  }

  ngOnInit() {

  }

  // This method associate to Save Button.
  onSave() {
    if (this.submitType === 'Save') {
      // Push registration model object into registration list.
      this.registrations.push(this.regModel);
    } else {

      //Finds the id of the required object to be updated
      for (var j = 0; j < this.registrations.length; j++) {
        if (this.registrations[j].id == this.regModel.id) {
          this.selectedRow = j
          break
        }
      }

      // Update the existing properties values based on model.
      this.registrations[this.selectedRow].firstName = this.regModel.firstName;
      this.registrations[this.selectedRow].lastName = this.regModel.lastName;
      this.registrations[this.selectedRow].dob = this.regModel.dob;
      this.registrations[this.selectedRow].email = this.regModel.email;
      this.registrations[this.selectedRow].password = this.regModel.password;
      this.registrations[this.selectedRow].country = this.regModel.country;
    }

  }

  // This method associate to Delete Button.
  onDelete(isTrue: boolean, id: number) {

    //Finds the required registration to delete
    for (var j = 0; j < this.registrations.length; j++) {
      if (this.registrations[j].id == id) {
        this.selectedRow = j
        break
      }
    }
    // Deletes the corresponding registration entry from the list.
    if (isTrue) {
      this.registrations.splice(this.selectedRow, 1);
    }

  }

  // This method associate toCancel Button.
  onCancel() {
    // Hide registration entry section.
    this.showNew = false;
  }

  // This method associate to Bootstrap dropdown selection change.
  onChangeCountry(country: string) {
    // Assign corresponding selected country to model.
    this.regModel.country = country;
  }

  //This method associates in recieving data from the reg-modal child component to save a particular registration
  getData(registration: any) {

    //Assign the recieved data into the model
    this.regModel = Object.assign({}, registration);

    //Sets the id of the object to be saved
    this.regModel.id = this.registrations[this.registrations.length - 1].id + 1;

    //Changes submit type to Update
    this.submitType = 'Save';

    //Saves the recieved data
    this.onSave()
  }

  //This method associates in recieving data from the edit-reg-modal child component to edit a particular registration
  getDataToEdit(registration: any) {

    //Assign the recieved data into the model
    this.regModel = Object.assign({}, registration);

    //Changes submit type to Update
    this.submitType = 'Update';

    //Saves the recieved data
    this.onSave()
  }
  //This method associates in recieving data from the alert child component to delete a particular registration
  getDataToDelete(data: any) {

    //deletes the selected registration
    this.onDelete(data.isTrue, data.selectedId);

  }

}
