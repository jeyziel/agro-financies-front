import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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

  public SalesSelected: any
  
  
  public fn: any;
  public paramsDelete: any;
  
  constructor(
  
    private modalService: NgbModal,
    private salesService: SalesService,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {

    this.addSalesForm = new FormGroup({
      safra_id: new FormControl(null, [Validators.required]),
      productive_area_id: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      seller_at: new FormControl(null, [Validators.required]),
      observation: new FormControl(null, [Validators.required])
    })

    this.editSalesForm = new FormGroup({
      safra_id: new FormControl(null, [Validators.required]),
      productive_area_id: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      seller_at: new FormControl(null, [Validators.required]),
      observation: new FormControl(null, [Validators.required])
    })

    this.getSales()

  }

  getSales(){

    this.salesService.all()
    .subscribe(sales => {
      

      if (sales.length == 0) {
        this.toastr.error('Não há vendas registradas no sistema', 'Sem vendas');
        return;
      }

      this.sales = sales;
    },
    err => {
      this.toastr.error('Falha ao buscar Vendas. Tente novamente', 'Erro');
    })


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
