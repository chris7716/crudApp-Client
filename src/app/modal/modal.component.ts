import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  inputsForm: FormGroup;
  Spacing: number;
  DLarge: number;

  ngOnInit(): void {

    this.inputsForm = this.fb.group({

      Spacing: [this.Spacing, [Validators.required, this.checkSpacing]],

      DLarge: [this.DLarge, [Validators.required, this.checkDLarge]]

    });

  }

  closeResult: string;
  constructor(private modalService: NgbModal, private fb: FormBuilder) { }
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
  checkSpacing(control: FormControl) {
    if (control.value == 16 || control.value == 24) {
      return { validSpacing: false };
    }
    return { validSpacing: true };
  }
  checkDLarge(control: FormControl) {
    if (control.value == 3.5 || control.value == 4 || control.value == 6) {
      return { validD: false }
    }
    else {
      return { validD: true }
    }
  }
  @Output()
  passData: EventEmitter<Object> = new EventEmitter();

  setValues() {
    this.passData.emit({ Spacing: this.Spacing, DLarge: this.DLarge })
  }

}
