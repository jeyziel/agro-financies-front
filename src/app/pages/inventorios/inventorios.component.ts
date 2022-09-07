import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Inventory} from '../../interfaces/inventory';
import {InventoryService} from '../../services/inventory.service';
import {ProvidersService} from '../../services/providers.service';
import {PaymentTypesService} from '../../services/payment-types.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inventorios',
  templateUrl: './inventorios.component.html',
  styleUrls: ['./inventorios.component.scss']
})
export class InventoriosComponent implements OnInit {
  closeResult = '';
  public addInventoriosForm: FormGroup;
  public editInventoriosForm: FormGroup;

  public inventories: Inventory[];
  public providers;
  public paymentTypes;

  //formds
  public submittedInventorio;
  public successInventorio;

  public inventorioSelected: any;

  fn: any;
  paramsDelete: any;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private inventoryService: InventoryService,
    private providerService: ProvidersService,
    private paymentService: PaymentTypesService,
    private toastr: ToastrService
  )
  {
    this.addInventoriosForm = new FormGroup({
      number: new FormControl(null, [Validators.nullValidator]),
      provider_id: new FormControl(null, [Validators.required]),
      payment_type_id: new FormControl(null, [Validators.required]),
      paid_at: new FormControl(null, [Validators.required]),
    });

    this.editInventoriosForm = new FormGroup({
      number: new FormControl(null, [Validators.nullValidator]),
      provider_id: new FormControl(null, [Validators.required]),
      payment_type_id: new FormControl(null, [Validators.required]),
      paid_at: new FormControl(null, [Validators.required]),
    });

  }

  ngOnInit(): void {


    this.getInventorios();
    this.getFornecedores();
    this.getTiposPagamento();
    // this.create({
    //   'number': '14897',
    //   'provider_id': 1,
    //   'payment_type_id': 1,
    //   'paid_at': '2022-08-31'
    // });

  }

  get addForm() { return this.addInventoriosForm.controls; }
  get editForm() { return this.editInventoriosForm.controls; }

  create() {

    this.submittedInventorio = true;
    this.successInventorio = false;

    if (this.addInventoriosForm.invalid)
      return;


    this.inventoryService.create(this.addInventoriosForm.value)
      .subscribe((inventory: Inventory) => {

        this.toastr.success("Inventório Criado", "Sucesso", {positionClass: "toast-top-right"})

        this.successInventorio = true
        this.router.navigate(['/inventorio', inventory.id]);

      }, (error) => {
        this.toastr.error("Falha ao Criar Inventório. Tente Novamente!", "Erro", {positionClass: "toast-top-right"})
      });
  }

  update(){

    
    this.submittedInventorio = true;
    this.successInventorio = false;


    if(this.editInventoriosForm.pristine || this.editInventoriosForm.untouched || !this.editInventoriosForm.valid){
      return
    }

    const inventorio = this.editInventoriosForm.value

    this.inventoryService.update(this.inventorioSelected.id, inventorio)
      .subscribe(
        inventorio => {

          this.successInventorio = true;
          this.toastr.info("Inventorio Atualizado", "Sucesso", {positionClass: "toast-top-right"})
        },
        err => {
          this.toastr.error("Falha ao Editar Inventorio. Tente Novamente!", "Erro", {positionClass: "toast-top-right"})
        }
      )

  }

  onEdit(inventorio){

    console.log(inventorio)

    this.editInventoriosForm.controls['number'].setValue(inventorio?.number)
    this.editInventoriosForm.controls['provider_id'].setValue(inventorio?.provider_id)
    this.editInventoriosForm.controls['payment_type_id'].setValue(inventorio?.payment_type_id)
    this.editInventoriosForm.controls['paid_at'].setValue(inventorio?.paid_at)

    this.inventorioSelected = inventorio


  }

  delete(id: Number) {


    this.inventoryService.delete(id)
      .subscribe(
        product => {
          this.toastr.info('Iventorio Deletado!', 'Sucesso', {positionClass: 'toast-top-right'});

          this.getInventorios();
        },
        err => {
          this.toastr.info('Falha ao deletar Iventorio!', 'Erro', {positionClass: 'toast-top-right'});
        }
      )

  }



  

  getInventorios(): void {

    this.inventoryService.all()
      .subscribe((inventories: Inventory[]) => {
          this.inventories = inventories;
          

      },
        (error) => {
          console.log(error);
      });


  }

  getFornecedores(){

    this.providerService.all()
      .subscribe(provider => {
        this.providers = provider;
        console.log('providers', this.providers);
      },error => {
        console.log('error', error);
      });

  }

  getTiposPagamento() {
    this.paymentTypes = [
      {
        'id': 1,
        'name': 'A VISTA'
      },
      {
        'id': 2,
        'name': 'A PRAZO'
      },
    ];

    // this.paymentService.all()
    //   .subscribe(provider => {
    //     this.paymentTypes = provider;
    //   },error => {
    //     console.log('error', error);
    //   });

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

    this.successInventorio = false;
    this.submittedInventorio = false;

    this.addInventoriosForm.reset()
    this.addInventoriosForm.setErrors(null)
    
    this.editInventoriosForm.reset()
    this.editInventoriosForm.setErrors(null)   

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  goToDetail(inventory: Inventory){
    this.router.navigate(['/inventorio', inventory.id]);
  }



}
