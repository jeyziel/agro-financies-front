import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inventorios',
  templateUrl: './inventorios.component.html',
  styleUrls: ['./inventorios.component.scss']
})
export class InventoriosComponent implements OnInit {

  
  closeResult = '';
  public addInventorios : FormGroup;

  constructor(private modalService: NgbModal) { }

 
  ngOnInit(): void {

    this.addInventorios = new FormGroup({
      provider_id: new FormControl(null, [Validators.required]),
      payment_type_id: new FormControl(null, [Validators.required]),
      paid_at: new FormControl(null, [Validators.nullValidator]),
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
