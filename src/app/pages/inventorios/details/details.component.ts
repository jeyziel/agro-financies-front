import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  closeResult = '';
  public addProdutos : FormGroup;
  private idIventory

  constructor(private modalService: NgbModal, private route: ActivatedRoute) { }

 
  ngOnInit(): void {

    this.addProdutos = new FormGroup({
      product_id: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required]),
      weight: new FormControl(null, [Validators.nullValidator]),
      unit_value: new FormControl(null, [Validators.required]),
    })

    this.idIventory = this.route.snapshot.params['id'];

  }

  addProducts(){


    
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
