import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.scss']
})
export class FuncionariosComponent implements OnInit {

  closeResult = '';
  public addFuncionariosForm : FormGroup;
  public editFuncionariosForm : FormGroup;

  
  public funcionarios;
  

  public submittedFuncionario: Boolean;
  public successFuncionario: Boolean;

  public funcionarioSelected: any
  
  
  public fn: any;
  public paramsDelete: any;

  constructor(
    private modalService: NgbModal,
    private employeeService: EmployeeService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

 
  ngOnInit(): void {

    this.addFuncionariosForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      matricula: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.nullValidator]),
      function: new FormControl(null, [Validators.nullValidator]),
      address: new FormControl(null, [Validators.nullValidator])
    })

    this.editFuncionariosForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      matricula: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.nullValidator]),
      function: new FormControl(null, [Validators.nullValidator]),
      address: new FormControl(null, [Validators.nullValidator])
    })

    this.getFuncionarios();

  }




  create(){

    this.submittedFuncionario = true
    this.successFuncionario = false;

    if (this.addFuncionariosForm.invalid)
      return;

    
    const Funcionario = this.addFuncionariosForm.value

    this.employeeService.create(Funcionario)
      .subscribe(Funcionario => {


        this.addFuncionariosForm.reset()
        this.addFuncionariosForm.setErrors(null)

        this.submittedFuncionario = false
        this.successFuncionario = true;

        this.toastr.success('Funcionario Cadastrada', 'SUCESSO');
        this.getFuncionarios();

      },
      err => {
        this.toastr.error('Falha ao cadastrar Funcionario ', 'SUCESSO');
      })
    
  }

  onEditFuncionario(funcionario){

    this.editFuncionariosForm.controls['name'].setValue(funcionario.name)
    this.editFuncionariosForm.controls['matricula'].setValue(funcionario.matricula)
    this.editFuncionariosForm.controls['phone'].setValue(funcionario.phone)
    this.editFuncionariosForm.controls['function'].setValue(funcionario.function)
    this.editFuncionariosForm.controls['address'].setValue(funcionario.address)

  
    this.funcionarioSelected = funcionario

  }

  update(){

    this.submittedFuncionario = true
    this.successFuncionario = false;

    if (this.editFuncionariosForm.invalid)
      return;

    
    const Funcionario = this.editFuncionariosForm.value

    this.employeeService.edit(this.funcionarioSelected?.id, Funcionario)
      .subscribe(Funcionario => {

        
        this.submittedFuncionario = false
        this.successFuncionario = true;

        this.toastr.info('Funcionario Atualizado!', 'SUCESSO');
        this.getFuncionarios();

      },
      err => {
        this.toastr.error('Falha ao cadastrar Funcionario ', 'SUCESSO');
      })

  }

  delete(){

    const id = this.funcionarioSelected?.id

    this.employeeService.delete(id)
    .subscribe(
      Funcionario => {
        this.toastr.warning("Funcionario Deletada com sucesso!", "SUCESSO", {positionClass: "toast-top-right"})
        this.getFuncionarios()
      },
      err => {
        this.toastr.error("Falha ao deletar Funcionario. Tente novamente!", "ERRO", {positionClass: "toast-top-right"})
      }
    )


  }

  getFuncionarios(){

    this.employeeService.all()
      .subscribe(tasks => {
        this.funcionarios = tasks
      },
      err => {
        this.toastr.error('Falha ao buscar Funcionarios. Tente Novamente!', 'ERRO')
      })


  }

 


  get addForm(){
    return this.addFuncionariosForm.controls
  }

  get editForm(){
    return this.editFuncionariosForm.controls
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


    this.successFuncionario = false;
    this.submittedFuncionario = false;


    this.addFuncionariosForm.reset()
    this.addFuncionariosForm.setErrors(null)
    
    this.editFuncionariosForm.reset()
    this.editFuncionariosForm.setErrors(null)   

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
