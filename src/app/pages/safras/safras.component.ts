import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SafrasService } from 'src/app/services/safras.service';

@Component({
  selector: 'app-safras',
  templateUrl: './safras.component.html',
  styleUrls: ['./safras.component.scss']
})
export class SafrasComponent implements OnInit {

  closeResult = '';
  public addSafrasForm : FormGroup;
  public editSafrasForm : FormGroup;
  public safras;

  public submittedSafra: Boolean;
  public successSafra: Boolean;

  public safraSelected: any;


  fn: any;
  paramsDelete: any;

  constructor(
    private modalService: NgbModal,
    private safraService: SafrasService,
    private toastr: ToastrService
  ) { }

 
  ngOnInit(): void {

    this.addSafrasForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.nullValidator]),
    })

    this.editSafrasForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.nullValidator]),
    })

    this.getSafras();

  }


  get addForm(){
    return this.addSafrasForm.controls
  }

  get editForm(){
    return this.editSafrasForm.controls
  }

  onEditSafras(safra){



    this.editSafrasForm.controls['name'].setValue(safra?.name);
    this.editSafrasForm.controls['description'].setValue(safra?.description);
    
    this.safraSelected = safra
  }

  
  update(){

    
    this.submittedSafra = true;
    this.successSafra = false;


    if(this.editSafrasForm.pristine || this.editSafrasForm.untouched || !this.editSafrasForm.valid){
      return
    }


    const safra = this.editSafrasForm.value


    this.safraService.edit(this.safraSelected?.id, safra)
      .subscribe(
        product => {

          this.successSafra = true;
          this.toastr.info("Safra Atualizada!", "Sucesso", {positionClass: "toast-top-right"})


          this.getSafras();

        },
        err => {
          this.toastr.error("Falha ao Atualizar Safra. Tente Novamente!", "Erro", {positionClass: "toast-top-right"})
        }
      )

  }



  create(){

    this.submittedSafra = true

    if (this.addSafrasForm.invalid){
      return;
    }

    const category = this.addSafrasForm.value

    this.safraService.create(category)
      .subscribe(
        safras => {

          this.successSafra = true
          
          this.addSafrasForm.reset()
          this.addSafrasForm.setErrors(null)

          this.getSafras()

          this.toastr.warning('Safras criada com sucesso', 'SUCESSO!', {positionClass: "toast-top-right"});

        },
        err => {
          this.successSafra = false
          this.toastr.error('Erro ao cadastrar categória. Tente Novamente!', 'ERRO!', {positionClass: "toast-top-right"});
        }
      )


  }

  getSafras(){

    this.safraService.all()
      .subscribe(
        safras => {
          this.safras = safras
        },
        err => {
          this.toastr.error('Erro ao Buscar Safras!', 'Erro', {positionClass: 'toast-top-right'});
        }
      )

  }


  removerSafra(id: Number) {


    this.safraService.delete(id)
      .subscribe(
        product => {
          this.toastr.info('Safra Removida!', 'Sucesso', {positionClass: 'toast-top-right'});

          this.getSafras();
        },
        err => {
          this.toastr.error('Erro ao Remover Safra!', 'Erro', {positionClass: 'toast-top-right'});
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


    this.successSafra = false;
    this.submittedSafra = false;


    this.addSafrasForm.reset()
    this.addSafrasForm.setErrors(null)
    
    this.editSafrasForm.reset()
    this.editSafrasForm.setErrors(null)   

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
