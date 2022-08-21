import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categorias-produtos',
  templateUrl: './categorias-produtos.component.html',
  styleUrls: ['./categorias-produtos.component.scss']
})
export class CategoriasProdutosComponent implements OnInit {

  closeResult = '';
  public addCategorias : FormGroup;

  constructor(private modalService: NgbModal) { }

 

  ngOnInit(): void {

    this.addCategorias = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      descricao: new FormControl(null, [Validators.nullValidator]),
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
