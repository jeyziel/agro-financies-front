import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProductiveAreasService } from 'src/app/services/productive-areas.service';
import { SafrasService } from 'src/app/services/safras.service';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.scss']
})
export class VendasComponent implements OnInit {

  closeResult = '';
  public addSalesForm : FormGroup;
  public editSalesForm: FormGroup;
  public sales;

  public submittedSales: Boolean;
  public successSales: Boolean;

  public salesSelected: any
  
  
  public fn: any;
  public paramsDelete: any;

  public areas;
  public safras;
  
  constructor(
  
    private modalService: NgbModal,
    private salesService: SalesService,
    private safrasService: SafrasService,
    private areasProdutivas: ProductiveAreasService,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {

    this.addSalesForm = new FormGroup({
      safra_id: new FormControl(null, [Validators.required]),
      productive_area_id: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      seller_at: new FormControl(null, [Validators.required]),
      observation: new FormControl(null, [Validators.nullValidator])
    })

    this.editSalesForm = new FormGroup({
      safra_id: new FormControl(null, [Validators.required]),
      productive_area_id: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      seller_at: new FormControl(null, [Validators.required]),
      observation: new FormControl(null, [Validators.nullValidator])
    })

    this.getSales()
    this.getSafras()
    this.getAreasProdutivas()

  }

  get addForm(){
    return this.addSalesForm.controls
  }

  get editForm(){
    return this.editSalesForm.controls
  }

  getSales(){

    this.salesService.all()
    .subscribe(sales => {
      

      if (sales.length == 0) {
        this.toastr.info('Não há vendas registradas no sistema', 'Sem vendas');
        return;
      }

      this.sales = sales;
    },
    err => {
      this.toastr.error('Falha ao buscar Vendas. Tente novamente', 'Erro');
    })


  }

  getAreasProdutivas(){

    this.areasProdutivas.all()
    .subscribe(areas => {
      this.areas = areas;
    },
    err => {
      console.log(err)
    })

  }

  getSafras(){

    this.safrasService.all()
    .subscribe(safras => {
      this.safras = safras;
    },
    err => {
      console.log(err)
    })

  }

  create(){

    this.submittedSales = true;
    this.successSales = false;

    console.log(this.addSalesForm.controls)

    if (this.addSalesForm.invalid)
      return;

    const sale = this.addSalesForm.value
    
    this.salesService.create(sale)
      .subscribe(sale => {

        this.toastr.success("Venda Lançada!", "Sucesso", {positionClass: "toast-top-right"})

        this.getSales();

        this.successSales = true;
        this.addSalesForm.clearValidators();
        this.addSalesForm.reset();

      },
      err => {
        this.toastr.error("Falha ao Lançar Venda. Tente Novamente!", "Erro", {positionClass: "toast-top-right"})
      })

  }

  update(){

    this.submittedSales = true;
    this.successSales = false;

    if(this.editSalesForm.pristine || this.editSalesForm.untouched || !this.editSalesForm.valid){
      return
    }

    const sale = this.editSalesForm.value

    this.salesService.edit(this.salesSelected.id, sale)
      .subscribe(
        sale => {

          this.successSales = true;
          this.toastr.info("Venda atualizada", "Sucesso", {positionClass: "toast-top-right"})


          this.getSales();

        },
        err => {
          this.toastr.error("Falha ao atualizar Venda. Tente Novamente!", "Erro", {positionClass: "toast-top-right"})
        }
      )

  }


  onEditSales(sale){

    this.editSalesForm.controls['safra_id'].setValue(sale?.safra_id);
    this.editSalesForm.controls['productive_area_id'].setValue(sale?.productive_area_id);
    this.editSalesForm.controls['quantity'].setValue(sale?.quantity);
    this.editSalesForm.controls['price'].setValue(sale?.price);
    this.editSalesForm.controls['seller_at'].setValue(sale?.seller_at);
    this.editSalesForm.controls['observation'].setValue(sale?.observation);
    
    this.salesSelected = sale

  }

  delete(id: Number){
  
    this.salesService.delete(id)
      .subscribe(
        product => {
          this.toastr.warning("Venda excluída com sucesso!", "SUCESSO", {positionClass: "toast-top-right"})
        },
        err => {
          this.toastr.error("Falha ao excluir Venda. Tente novamente!", "ERRO", {positionClass: "toast-top-right"})
        }
      )
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


    this.successSales = false;
    this.submittedSales = false;


    this.addSalesForm.reset()
    this.addSalesForm.setErrors(null)
    
    this.editSalesForm.reset()
    this.editSalesForm.setErrors(null)   

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
