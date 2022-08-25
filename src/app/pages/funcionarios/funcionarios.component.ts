import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.scss']
})
export class FuncionariosComponent implements OnInit {

  closeResult = '';
  public addFuncionarios : FormGroup;

  constructor(private modalService: NgbModal) { }

 
  ngOnInit(): void {

    this.addFuncionarios = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      matricula: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.nullValidator]),
      fucntion: new FormControl(null, [Validators.nullValidator]),
      address: new FormControl(null, [Validators.nullValidator])
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
