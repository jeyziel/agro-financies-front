import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProvidersService } from 'src/app/services/providers.service';
import { SuppliersService } from 'src/app/services/suppliers.service';

@Component({
  selector: 'app-vendedores',
  templateUrl: './vendedores.component.html',
  styleUrls: ['./vendedores.component.scss']
})
export class VendedoresComponent implements OnInit {

  closeResult = '';
  public addVendedoresForm : FormGroup;
  public editVendedoresForm : FormGroup;
  public vendedores;

  public submittedVendedor: Boolean;
  public successVendedor: Boolean;

  public vendedorSelected: any;


  private fornecedor_id;
  public fornecedor;


  fn: any;
  paramsDelete: any;

  constructor(
    private modalService: NgbModal,
    private supplierService: SuppliersService,
    private providerService: ProvidersService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) 
  { }

 
  ngOnInit(): void {


    this.fornecedor_id = this.route.snapshot.params['id']

    this.addVendedoresForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      phone1: new FormControl(null, [Validators.required]),
      phone2: new FormControl(null, [Validators.nullValidator]),
      address: new FormControl(null, [Validators.nullValidator]),
      provider_id: new FormControl(this.fornecedor_id, [Validators.nullValidator]),
    })

    this.editVendedoresForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      phone1: new FormControl(null, [Validators.required]),
      phone2: new FormControl(null, [Validators.nullValidator]),
      address: new FormControl(null, [Validators.nullValidator]),
    })

    

    this.getVendedores(this.fornecedor_id);
    this.getFornecedor(this.fornecedor_id);

  }

  get addForm(){
    return this.addVendedoresForm.controls
  }

  get editForm(){
    return this.editVendedoresForm.controls
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


  create(){

    this.submittedVendedor = true
    this.successVendedor = false;

    if (this.addVendedoresForm.invalid)
      return;

    
    const vendedor = this.addVendedoresForm.value

    this.supplierService.create(vendedor)
      .subscribe(vendedor => {


        this.addVendedoresForm.reset()
        this.addVendedoresForm.setErrors(null)

        this.submittedVendedor = false
        this.successVendedor = true;

        this.getVendedores(this.fornecedor_id);

        this.toastr.success('Vendedor Cadastrado!', 'SUCESSO');
   

      },
      err => {
        this.toastr.error('Falha ao cadastrar Vendedor ', 'SUCESSO');
      })
    
  }

  onEditVendedor(vendedor){

    this.editVendedoresForm.controls['name'].setValue(vendedor.name)
    this.editVendedoresForm.controls['phone1'].setValue(vendedor.phone1)
    this.editVendedoresForm.controls['phone2'].setValue(vendedor.phone2)
    this.editVendedoresForm.controls['address'].setValue(vendedor.address)

  
    this.vendedorSelected = vendedor

  }

  update(){

    this.submittedVendedor = true
    this.successVendedor = false;

    if (this.editVendedoresForm.invalid)
      return;

    
    const vendedor = this.editVendedoresForm.value

    this.supplierService.edit(this.vendedorSelected?.id, vendedor)
      .subscribe(vendedor => {

        
        this.submittedVendedor = false
        this.successVendedor = true;

        this.toastr.info('Vendedor Atualizado!', 'SUCESSO');
        this.getVendedores(this.fornecedor_id);

      },
      err => {
        this.toastr.error('Falha ao cadastrar Vendedor ', 'SUCESSO');
      })

  }

  removerVendedor(id: Number){

  
    this.supplierService.delete(id)
    .subscribe(
      Vendedor => {
        this.toastr.warning("Vendedor Deletado com sucesso!", "SUCESSO", {positionClass: "toast-top-right"})
        this.getVendedores(this.fornecedor_id)
      },
      err => {
        this.toastr.error("Falha ao deletar Vendedor. Tente novamente!", "ERRO", {positionClass: "toast-top-right"})
      }
    )


  }

  getVendedores(fornecedor_id: Number = null){

    const params = {
      provider_id: fornecedor_id
    }

    this.supplierService.all(params)
      .subscribe(vendedores => {
        this.vendedores = vendedores
      },
      err => {
        this.toastr.error('Falha ao buscar Vendedor. Tente Novamente!', 'ERRO')
      })


  }

  getFornecedor(id: Number){

    this.providerService.find(id)
      .subscribe(fornecedor => {
        this.fornecedor = fornecedor
      },
      err => {
        this.toastr.error('Falha ao buscar Fornecedor. Tente Novamente!', 'ERRO')
      })


  }

 

  
  confirmationDelete() {
    this.fn(...this.paramsDelete);
  }

  private getDismissReason(reason: any): string {


    this.successVendedor = false;
    this.submittedVendedor = false;


    this.addVendedoresForm.reset()
    this.addVendedoresForm.setErrors(null)
    
    this.editVendedoresForm.reset()
    this.editVendedoresForm.setErrors(null)   

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



}
