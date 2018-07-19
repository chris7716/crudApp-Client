import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Console } from '@angular/core/src/console';

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
  closeResult: string;
  inputsForm: FormGroup;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  public dob: NgbDateStruct = null;
  countries: string[] = ['SRI LANKA', 'US', 'UK', 'India', 'UAE'];
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  validity = false;

  constructor(private modalService: NgbModal, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.inputsForm = this.fb.group({
      firstName: [this.firstName, [Validators.required]],
      lastName: [this.lastName,[Validators.required]],
      email: [this.email, [Validators.required, Validators.pattern(this.emailPattern)]],
      country: [this.country, [Validators.required]],
      dob: [this.dob, [Validators.required]]
    });
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }

  }
  onChangeCountry(country: string) {
    // Assign corresponding selected country to model.)
    this.country = country;
  }
  @Output()
  passData: EventEmitter<Object> = new EventEmitter();
  setValues() {
    const reg: Registration = Object.assign({}, this.inputsForm.value);
    this.passData.emit(reg)
  }
}