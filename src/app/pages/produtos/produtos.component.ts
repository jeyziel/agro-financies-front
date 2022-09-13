import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  public submittedProduto: Boolean;
  public successProduto: Boolean;
  tipoModal: any;
  fn: any;
  paramsDelete: any;

  
  constructor(
    private modalService: NgbModal,
    private productsService: ProductsService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    /// this.toastr.success("Produto Criado", "Sucesso")

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

    this.submittedProduto = true;
    this.successProduto = false;

    if (this.addProdutosForm.invalid)
      return;

    const product = this.addProdutosForm.value
    
    this.productsService.create(product)
      .subscribe(product => {


        this.toastr.success("Produto Criado", "Sucesso", {positionClass: "toast-top-right"})


        this.getProducts();

        this.successProduto = true;
        this.addProdutosForm.clearValidators();
        this.addProdutosForm.reset();

        console.log('produto adicionado com sucesso')
      },
      err => {
        this.toastr.error("Falha ao adicionar Produto. Tente Novamente!", "Erro", {positionClass: "toast-top-right"})
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

    
    this.submittedProduto = true;
    this.successProduto = false;


    if(this.editProdutosForm.pristine || this.editProdutosForm.untouched || !this.editProdutosForm.valid){
      return
    }



    const produto = this.editProdutosForm.value


    this.productsService.edit(this.productSelected.id, produto)
      .subscribe(
        product => {

          this.successProduto = true;
          this.toastr.info("Produto Editado", "Sucesso", {positionClass: "toast-top-right"})

          console.log('produto editado com sucesso')
        },
        err => {
          this.toastr.error("Falha ao Editar Produto. Tente Novamente!", "Erro", {positionClass: "toast-top-right"})
        }
      )

  }

  delete(id){
  

    this.productsService.delete(id)
    .subscribe(
      product => {
        this.toastr.info("Produto Deletado com sucesso!", "SUCESSO", {positionClass: "toast-top-right"})
      },
      err => {
        this.toastr.error("Falha ao deletar produto. Tente novamente!", "ERRO", {positionClass: "toast-top-right"})
      }
    )



  }

  removerProduto(id: Number) {


    this.productsService.delete(id)
      .subscribe(
        product => {
          this.toastr.info('Produto Atualizado!', 'Sucesso', {positionClass: 'toast-top-right'});

          this.getProducts();
        },
        err => {
          this.toastr.info('Falha ao deletar Produto!', 'Erro', {positionClass: 'toast-top-right'});
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


  open(content, fn = null, ...params) {

    this.tipoModal = params //recebe o tipo de modal. DETALHES, ou CREATE.
   
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', 'centered': true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    //delete params
    this.fn = fn;
    this.paramsDelete = params;
  }

  

  confirmationDelete() {
    this.fn(...this.paramsDelete);
  }

  private getDismissReason(reason: any): string {


    this.successProduto = false;
    this.submittedProduto = false;


    this.addProdutosForm.reset()
    this.addProdutosForm.setErrors(null)
    
    this.editProdutosForm.reset()
    this.editProdutosForm.setErrors(null)   

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
