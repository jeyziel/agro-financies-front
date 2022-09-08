import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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

  public submittedCategoria: Boolean;
  public successCategoria: Boolean;

  public categoriaSelected: any;


  fn: any;
  paramsDelete: any;

  constructor(
    private modalService: NgbModal,
    private productService: ProductsService,
    private toastr: ToastrService
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


  get addForm(){
    return this.addCategoriasForm.controls
  }

  get editForm(){
    return this.editCategoriasForm.controls
  }

  onEditCategorias(categoria){

    console.log(categoria)

    this.editCategoriasForm.controls['name'].setValue(categoria?.name);
    this.editCategoriasForm.controls['description'].setValue(categoria?.description);
    
    this.categoriaSelected = categoria
  }

  
  update(){

    
    this.submittedCategoria = true;
    this.successCategoria = false;


    if(this.editCategoriasForm.pristine || this.editCategoriasForm.untouched || !this.editCategoriasForm.valid){
      return
    }


    const category = this.editCategoriasForm.value


    this.productService.editCategory(this.categoriaSelected?.id, category)
      .subscribe(
        product => {

          this.successCategoria = true;
          this.toastr.info("Categoria Atualizada!", "Sucesso", {positionClass: "toast-top-right"})


          this.getCategories();

        },
        err => {
          this.toastr.error("Falha ao Atualizar Categoria. Tente Novamente!", "Erro", {positionClass: "toast-top-right"})
        }
      )

  }



  create(){

    this.submittedCategoria = true

    if (this.addCategoriasForm.invalid){
      return;
    }

    const category = this.addCategoriasForm.value

    this.productService.addCategories(category)
      .subscribe(
        categories => {

          this.successCategoria = true
          
          this.addCategoriasForm.reset()
          this.addCategoriasForm.setErrors(null)

          this.getCategories()

          this.toastr.success('Categoria de Produto criada com sucesso', 'SUCESSO!', {positionClass: "toast-top-right"});

        },
        err => {
          this.successCategoria = false
          this.toastr.error('Erro ao cadastrar categória. Tente Novamente!', 'ERRO!', {positionClass: "toast-top-right"});
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
          this.toastr.error('Erro ao Buscar Categorias!', 'Erro', {positionClass: 'toast-top-right'});
        }
      )

  }


  removerCategoria(id: Number) {


    this.productService.deleteCategory(id)
      .subscribe(
        product => {
          this.toastr.info('Categoria Removida!', 'Sucesso', {positionClass: 'toast-top-right'});

          this.getCategories();
        },
        err => {
          this.toastr.error('Erro ao Remover Categoria!', 'Erro', {positionClass: 'toast-top-right'});
        }
      )

  }


  confirmationDelete() {
    this.fn(...this.paramsDelete);
  }

  


  open(content, fn = null, ...params) {

   
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', 'centered': true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    //delete params
    this.fn = fn;
    this.paramsDelete = params;
  }

  private getDismissReason(reason: any): string {


    this.successCategoria = false;
    this.submittedCategoria = false;


    this.addCategoriasForm.reset()
    this.addCategoriasForm.setErrors(null)
    
    this.editCategoriasForm.reset()
    this.editCategoriasForm.setErrors(null)   

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
