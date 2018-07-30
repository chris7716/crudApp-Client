import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbDateStruct, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';

//Model class for user input data
class Registration {
  constructor(
    public id: number,
    public index: number,
    public firstName: string = '',
    public lastName: string = '',
    public dob: NgbDateStruct = null,
    public email: string = '',
    public password: string = '',
    public country: string = 'Select country'
  ) { }
}

@Component({
  selector: 'app-edit-reg-modal',
  templateUrl: './edit-reg-modal.component.html',
  styleUrls: ['./edit-reg-modal.component.css']
})

export class EditRegModalComponent implements OnInit {

  //It is required for modal settings
  closeResult: string;

  //It is required for input form
  inputsForm: FormGroup;

  //These is required for form controls
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  public dob: NgbDateStruct = null;
  openModal = false;

  //It is required to maintain the country list on dropdown
  countries: string[] = ['SRI LANKA', 'US', 'UK', 'India', 'UAE'];

  //It is required to validate the email
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  //It is required to store the state of the validity of the form
  validity = false;

  constructor(private modalService: NgbModal, private fb: FormBuilder) { }

  //It is required to bind registration model from the registration parent component 
  @Input() registration: Registration;

  ngOnInit() {

    //Initializes the country textbox value into the value recieved from registration model
    this.country = this.registration.country;

    //Initializes the form
    this.inputsForm = this.fb.group({
      firstName: [this.registration.firstName, [Validators.required]],
      lastName: [this.registration.lastName, [Validators.required]],
      email: [this.registration.email, [Validators.required, Validators.pattern(this.emailPattern)]],
      country: [this.registration.country, [Validators.required]],
      dob: [this.registration.dob, [Validators.required]]
    });
  }

  //It is required to modal settings
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  //It is required to modal settings
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }

  }

  //It is required to get the value of the selected country on dropdown
  onChangeCountry(country: string) {

    //Assigns 'Country' form value to the selected dropdown country
    this.inputsForm.value.country = country;

    //Assigns country variable to the selected dropdown country
    this.country = country;

  }

  //It is required to pass data to the parent component
  @Output()
  passData: EventEmitter<Object> = new EventEmitter();
  setValues() {

    //Assigns form values to the object i.e. to be sent to the parent
    const reg: Registration = Object.assign({}, this.inputsForm.value);

    //Assigns id of the recieved object to the object i.e. to be sent to the parent
    reg.id = this.registration.id

    //Passes data to the parent
    this.passData.emit(reg)
  }
}
