import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProvidersService } from 'src/app/services/providers.service';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.scss']
})
export class FornecedoresComponent implements OnInit {

  closeResult = '';
  public addFornecedoresForm : FormGroup;
  public editFornecedoresForm : FormGroup;
  public fornecedores;

  public submittedFornecedor: Boolean;
  public successFornecedor: Boolean;

  public fornecedorSelected: any;


  fn: any;
  paramsDelete: any;

  constructor(
    private modalService: NgbModal,
    private providerService: ProvidersService,
    private toastr: ToastrService
  ) 
  { }

 
  ngOnInit(): void {

    this.addFornecedoresForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      cnpj: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.nullValidator]),
      address: new FormControl(null, [Validators.nullValidator])
    })

    this.editFornecedoresForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      cnpj: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.nullValidator]),
      address: new FormControl(null, [Validators.nullValidator])
    })


    this.getFornecedores();

  }

  get addForm(){
    return this.addFornecedoresForm.controls
  }

  get editForm(){
    return this.editFornecedoresForm.controls
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

    this.submittedFornecedor = true
    this.successFornecedor = false;

    if (this.addFornecedoresForm.invalid)
      return;

    
    const fornecedor = this.addFornecedoresForm.value

    this.providerService.create(fornecedor)
      .subscribe(fornecedor => {


        this.addFornecedoresForm.reset()
        this.addFornecedoresForm.setErrors(null)

        this.submittedFornecedor = false
        this.successFornecedor = true;

        this.getFornecedores();

        this.toastr.success('Fornecedor Cadastrado!', 'SUCESSO');
        this.getFornecedores();

      },
      err => {
        this.toastr.error('Falha ao cadastrar Fornecedor ', 'SUCESSO');
      })
    
  }

  onEditFornecedor(fornecedor){

    this.editFornecedoresForm.controls['name'].setValue(fornecedor.name)
    this.editFornecedoresForm.controls['cnpj'].setValue(fornecedor.cnpj)
    this.editFornecedoresForm.controls['phone'].setValue(fornecedor.phone)
    this.editFornecedoresForm.controls['address'].setValue(fornecedor.address)

  
    this.fornecedorSelected = fornecedor

  }

  update(){

    this.submittedFornecedor = true
    this.successFornecedor = false;

    if (this.editFornecedoresForm.invalid)
      return;

    
    const fornecedor = this.editFornecedoresForm.value

    this.providerService.edit(this.fornecedorSelected?.id, fornecedor)
      .subscribe(fornecedor => {

        
        this.submittedFornecedor = false
        this.successFornecedor = true;

        this.toastr.info('Fornecedor Atualizado!', 'SUCESSO');
        this.getFornecedores();

      },
      err => {
        this.toastr.error('Falha ao cadastrar Fornecedor ', 'SUCESSO');
      })

  }

  removerFornecedor(id: Number){

  
    this.providerService.delete(id)
    .subscribe(
      Fornecedor => {
        this.toastr.warning("Fornecedor Deletado com sucesso!", "SUCESSO", {positionClass: "toast-top-right"})
        this.getFornecedores()
      },
      err => {
        this.toastr.error("Falha ao deletar Fornecedor. Tente novamente!", "ERRO", {positionClass: "toast-top-right"})
      }
    )


  }

  getFornecedores(){

    this.providerService.all()
      .subscribe(fornecedores => {
        this.fornecedores = fornecedores
      },
      err => {
        this.toastr.error('Falha ao buscar Fornecedores. Tente Novamente!', 'ERRO')
      })


  }

 

  
  confirmationDelete() {
    this.fn(...this.paramsDelete);
  }

  private getDismissReason(reason: any): string {


    this.successFornecedor = false;
    this.submittedFornecedor = false;


    this.addFornecedoresForm.reset()
    this.addFornecedoresForm.setErrors(null)
    
    this.editFornecedoresForm.reset()
    this.editFornecedoresForm.setErrors(null)   

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
