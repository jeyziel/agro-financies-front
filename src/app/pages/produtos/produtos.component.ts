import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  closeResult = '';
  public addProdutos : FormGroup;
  
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {

    this.addProdutos = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      product_unit_id: new FormControl(null, [Validators.required]),
      product_category_id: new FormControl(null, [Validators.required]),
      function: new FormControl(null, [Validators.required]),
      alternative_products: new FormControl(null, [Validators.required])
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
