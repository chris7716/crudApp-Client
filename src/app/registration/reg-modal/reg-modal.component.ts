import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Console } from '@angular/core/src/console';

//Model class for user input data
class Registration {
  constructor(
    public firstName: string = '',
    public lastName: string = '',
    public dob: NgbDateStruct = null,
    public email: string = '',
    public password: string = '',
    public country: string = 'Select country'
  ) { }
}

@Component({
  selector: 'app-reg-modal',
  templateUrl: './reg-modal.component.html',
  styleUrls: ['./reg-modal.component.css']
})
export class RegModalComponent implements OnInit {

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

  //It is required to maintain the country list on dropdown
  countries: string[] = ['SRI LANKA', 'US', 'UK', 'India', 'UAE'];

  //It is required to validate the email
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  //It is required to store the state of the validity of the form
  validity = false;

  constructor(private modalService: NgbModal, private fb: FormBuilder) { }

  ngOnInit(): void {

    //Initialization of form
    this.inputsForm = this.fb.group({
      firstName: [this.firstName, [Validators.required]],
      lastName: [this.lastName, [Validators.required]],
      email: [this.email, [Validators.required, Validators.pattern(this.emailPattern)]],
      country: [this.country, [Validators.required]],
      dob: [this.dob, [Validators.required]]
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
    this.country = country;
  }

  //It is required to pass data to the parent component
  @Output()
  passData: EventEmitter<Object> = new EventEmitter();
  setValues() {
    const reg: Registration = Object.assign({}, this.inputsForm.value);
    this.inputsForm.reset();
    this.passData.emit(reg)
  }
}