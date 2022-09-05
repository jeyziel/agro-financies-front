import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-safras',
  templateUrl: './safras.component.html',
  styleUrls: ['./safras.component.scss']
})
export class SafrasComponent implements OnInit {

  closeResult = '';
  public addSafras : FormGroup;

  constructor(private modalService: NgbModal) { }

 
  ngOnInit(): void {

    this.addSafras = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      observation: new FormControl(null, [Validators.nullValidator]) 
    })

  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

}
