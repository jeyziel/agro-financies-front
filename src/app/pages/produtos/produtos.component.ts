import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  closeResult = '';
  public addProdutosForm : FormGroup;
  public editProdutosForm: FormGroup;
  public products;
  public productSelected;
  public categories;
  public units;

  //forms
  public submittedAdd;

  public submittedProduto: Boolean;
  public successProduto: Boolean;

  
  constructor(
    private modalService: NgbModal,
    private productsService: ProductsService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.addProdutosForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      product_unit_id: new FormControl(null, [Validators.required]),
      product_category_id: new FormControl(null, [Validators.required]),
      function: new FormControl(null, [Validators.nullValidator]),
      alternative_products: new FormControl(null, [Validators.nullValidator])
    })

    this.editProdutosForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      product_unit_id: new FormControl(null, [Validators.required]),
      product_category_id: new FormControl(null, [Validators.required]),
      function: new FormControl(null, [Validators.nullValidator]),
      alternative_products: new FormControl(null, [Validators.nullValidator])
    })

    this.getProducts()
    this.getCategories()
    this.getUnits()

  }

  get addForm(){
    return this.addProdutosForm.controls
  }

  get editForm(){
    return this.editProdutosForm.controls
  }


  create(){

    this.submittedAdd = true;

    if (this.addProdutosForm.invalid)
      return;

    const product = this.addProdutosForm.value
    
    this.productsService.create(product)
      .subscribe(product => {


        this.toastr.success("Produto Criado", "Sucesso", {positionClass: "toast-top-right"})


        this.getProducts();

        this.addProdutosForm.clearValidators();
        this.addProdutosForm.reset();

        console.log('produto adicionado com sucesso')
      },
      err => {
        console.log(err)
      })

  

  }

  onEditProdutos(produto){

   
    this.editProdutosForm.controls['name'].setValue(produto?.name);
    this.editProdutosForm.controls['product_unit_id'].setValue(produto?.product_unit_id);
    this.editProdutosForm.controls['product_category_id'].setValue(produto?.product_category_id);
    this.editProdutosForm.controls['function'].setValue(produto?.function);
    this.editProdutosForm.controls['alternative_products'].setValue(produto?.alternative_products);
    
    this.productSelected = produto

  }

  update(){


    if (!this.editProdutosForm.invalid)
      return;


    const produto = this.editProdutosForm.value


    this.productsService.edit(this.productSelected.id, produto)
      .subscribe(
        product => {

          this.toastr.info("Produto Editado", "Sucesso", {positionClass: "toast-top-right"})

          console.log('produto editado com sucesso')
        },
        err => {
          console.log('erro ao editar Produto')
        }
      )

  }

  delete(id){
  

    this.productsService.delete(id)
    .subscribe(
      product => {
        console.log('produto deletado com sucesso')
      },
      err => {
        console.log('erro ao deletar Produto')
      }
    )



  }


  getProducts(){

    this.productsService.all()
      .subscribe(products => {
        this.products = products;
      },
      err => {
        console.log(err)
      })

  }

  getCategories(){

    this.productsService.listCategories()
    .subscribe(categories => {
      this.categories = categories;
    },
    err => {
      console.log(err)
    })

  }

  getUnits(){

    this.productsService.listUnits()
    .subscribe(units => {
      this.units = units;
    },
    err => {
      console.log(err)
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

  goToDetails(product){
    //return this.router.navigate(['produtos', product.id]);
  }

}
