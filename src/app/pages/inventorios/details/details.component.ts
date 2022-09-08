import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { InventoryService } from 'src/app/services/inventory.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  closeResult = '';
  public addProdutosForm : FormGroup;
  public editProdutosForm : FormGroup;

  private idIventory
  public inventories;
  public products;

   //forms
   public submittedProduto;
   public successProduto;
 
   public inventorioSelected: any;
 
   fn: any;
   paramsDelete: any;

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private inventoryService: InventoryService,
    private productsService: ProductsService,
    private toastr: ToastrService
  ) { }

 
  ngOnInit(): void {

    this.addProdutosForm = new FormGroup({
      product_id: new FormControl(null, [Validators.required]),
      quantity: new FormControl(1, [Validators.required]),
      weight: new FormControl(null, [Validators.nullValidator]),
      unit_value: new FormControl(null, [Validators.required]),
    })

    this.editProdutosForm = new FormGroup({
      product_id: new FormControl(null, [Validators.required]),
      quantity: new FormControl(1, [Validators.required]),
      weight: new FormControl(null, [Validators.nullValidator]),
      unit_value: new FormControl(null, [Validators.required]),
    })

    this.idIventory = this.route.snapshot.params['id'];

    this.getDetailInventory(this.idIventory)
    this.getProducts()

  }

  get addForm() { return this.addProdutosForm.controls; }
  get editForm() { return this.editProdutosForm.controls; }

  getDetailInventory(idIventory: Number){

    this.inventoryService.details(idIventory)
      .subscribe((inventories: any[]) => {
          this.inventories = inventories;
          console.log(this.inventories)
      },
        (error) => {
          console.log(error);
      });

  }

  getProducts(){

    this.productsService.all()
      .subscribe(products => {
        this.products = products;
      },
      err => {
        this.toastr.error('Erro ao Buscar Produtos', 'Erro', {positionClass: "toast-top-right"})
      })

  }

  addProducts(){

    this.submittedProduto = true;
    this.successProduto = false;

    if (this.addProdutosForm.invalid)
      return;
  

    const product = this.addProdutosForm.value

    this.inventoryService.addProduct(this.idIventory, product)
      .subscribe((inventory: any) => {

        this.toastr.success("Produto Adicionado com sucesso", "Sucesso", {positionClass: "toast-top-right"})
        this.getDetailInventory(this.idIventory);
        
        this.successProduto = true

        this.addProdutosForm.reset()
        this.editProdutosForm.setErrors(null)

      }, (error) => {
        this.toastr.error("Falha ao Adicionar Produto. Tente Novamente!", "Erro", {positionClass: "toast-top-right"})
      });
    
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

  

  confirmationDelete() {
    this.fn(...this.paramsDelete);
  }

  private getDismissReason(reason: any): string {

    this.successProduto = false;
    this.submittedProduto = false;

    this.addProdutosForm.reset()
    this.editProdutosForm.setErrors(null)
    
    this.addProdutosForm.reset()
    this.editProdutosForm.setErrors(null)   

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
