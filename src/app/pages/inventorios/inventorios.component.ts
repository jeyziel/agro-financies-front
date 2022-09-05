import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Inventory} from '../../interfaces/inventory';
import {InventoryService} from '../../services/inventory.service';
import {ProvidersService} from '../../services/providers.service';
import {PaymentTypesService} from '../../services/payment-types.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventorios',
  templateUrl: './inventorios.component.html',
  styleUrls: ['./inventorios.component.scss']
})
export class InventoriosComponent implements OnInit {
  closeResult = '';
  public addInventoriosForm: FormGroup;
  public inventories: Inventory[];
  public providers;
  public paymentTypes;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private inventoryService: InventoryService,
    private providerService: ProvidersService,
    private paymentService: PaymentTypesService
  )
  {
    this.addInventoriosForm = new FormGroup({
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

  get f() { return this.addInventoriosForm.controls; }

  create() {

    this.inventoryService.create(this.addInventoriosForm.value)
      .subscribe((inventoty: Inventory) => {

        this.router.navigate(['/inventorio', inventoty.id]);

      }, (error) => {
          console.log('erro ao criar inventorio');
      });
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

  goToDetail(inventory: Inventory){
    this.router.navigate(['/inventorio', inventory.id]);
  }

  // validatedCreateForm(): Boolean{
  //
  //   return true;
  //
  // }

}
