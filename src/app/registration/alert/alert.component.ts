import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';

class Data{
    public selectedId: number;
    public isTrue: boolean;
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  //This is required to keep the model title
  title: string;

  //This is required to keep the model message
  message: string;

  //This is required to keep the return status of the input
  isTrue = false;

  //This is required to keep the object i.e. to be sent to the parent component
  dataModel = new Data();

  //This is required to keep the id of the selected registration from the parent component
  @Input() selectedId: number;

  constructor(private modalService: NgbModal) {
   }

  ngOnInit() {
  }

  //This is required to open the delete modal
  openDeleteModal(content) {

    //Changes modal title into delete
    this.title = "Delete";

    //Changes modal message as reuired to delte
    this.message = "Are you sure that you wanna delete this entry?"

    //Opens the modal
    const modalRef = this.modalService.open(content, { centered: true });;

  }

  //This is required to the confirmation of delete
  confirmDelete(){

    //Sets "dataModel" object's "isTrue" into "true"
    this.dataModel.isTrue = true;

    //Sets "dataModel" object's "selectedId" into the id recieved from the parent component
    this.dataModel.selectedId = this.selectedId;

    //Calls the "setvalues" function to send data to parent component
    this.setvalues();
  }

  //This is required to send data to registration parent component
  @Output()
  passData: EventEmitter<Object> = new EventEmitter();
  setvalues(){
    this.passData.emit(this.dataModel)
  }

}
