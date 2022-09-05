import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-categorias-produtos',
  templateUrl: './categorias-produtos.component.html',
  styleUrls: ['./categorias-produtos.component.scss']
})
export class CategoriasProdutosComponent implements OnInit {

  closeResult = '';
  public addCategoriasForm : FormGroup;
  public editCategoriasForm : FormGroup;
  public categories;

  public submittedAdd: Boolean;

  constructor(
    private modalService: NgbModal,
    private productService: ProductsService
  ) { }

 
  ngOnInit(): void {

    this.addCategoriasForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.nullValidator]),
    })

    this.editCategoriasForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.nullValidator]),
    })

    this.getCategories();

  }

  get addForm() {return this.addCategoriasForm.controls;}


  create(){

    this.submittedAdd = true

    if (this.addCategoriasForm.invalid){
      return;
    }

    const category = this.addCategoriasForm.value

    this.productService.addCategories(category)
      .subscribe(
        categories => {

          this.submittedAdd = false
          

          this.addCategoriasForm.reset()
          this.addCategoriasForm.clearValidators()

          this.getCategories()

        },
        err => {
          console.log(err)
        }
      )


  }

  getCategories(){

    this.productService.listCategories()
      .subscribe(
        categories => {
          this.categories = categories
        },
        err => {
          console.log(err)
        }
      )

  }

  deleteCategories(){

  }

  editCategories(){

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
