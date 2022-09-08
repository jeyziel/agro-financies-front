import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-atividades',
  templateUrl: './atividades.component.html',
  styleUrls: ['./atividades.component.scss']
})
export class AtividadesComponent implements OnInit {

  closeResult = '';
  public addAtividadesForm : FormGroup;
  public editAtividadesForm : FormGroup;

  
  public categories;
  
  public atividades;
  public atividadeSelected;

  public submittedAtividade: Boolean;
  public successAtividade: Boolean;
  
  
  public fn: any;
  public paramsDelete: any;

  constructor(
    private modalService: NgbModal,
    private tasksService: TasksService,
    private toastr: ToastrService
  ) 
  { }

 

  ngOnInit(): void {

    this.addAtividadesForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      price_default: new FormControl(null, [Validators.min(0)]),
      task_category_id: new FormControl(null, [Validators.required])
    })

    this.editAtividadesForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      price_default: new FormControl(null, [Validators.min(0)]),
      task_category_id: new FormControl(null, [Validators.required])
    })

    this.getAtividades()
    this.getCategories()

  }

  get addForm(){
    return this.addAtividadesForm.controls
  }

  get editForm(){
    return this.editAtividadesForm.controls
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

    this.submittedAtividade = true
    this.successAtividade = false;

    if (this.addAtividadesForm.invalid)
      return;

    
    const atividade = this.addAtividadesForm.value

    this.tasksService.create(atividade)
      .subscribe(atividade => {


        this.addAtividadesForm.reset()
        this.addAtividadesForm.setErrors(null)

        this.submittedAtividade = false
        this.successAtividade = true;

        this.toastr.success('Atividade Cadastrada', 'SUCESSO');
        this.getAtividades();

      },
      err => {
        this.toastr.error('Falha ao cadastrar Atividade ', 'SUCESSO');
      })
    
  }

  onEdit(task){

    this.editAtividadesForm.controls['name'].setValue(task.name)
    this.editAtividadesForm.controls['task_category_id'].setValue(task.task_category_id)
    this.editAtividadesForm.controls['price_default'].setValue(task.price_default)

    this.atividadeSelected = task

  }

  update(){

    this.submittedAtividade = true
    this.successAtividade = false;

    if (this.addAtividadesForm.invalid)
      return;

    
    const atividade = this.editAtividadesForm.value

    this.tasksService.edit(this.atividadeSelected?.id, atividade)
      .subscribe(atividade => {

        this.editAtividadesForm.reset()
        this.editAtividadesForm.setErrors(null)

        this.submittedAtividade = false
        this.successAtividade = true;

        this.toastr.info('Atividade Atualizada', 'SUCESSO');
        this.getAtividades();

      },
      err => {
        this.toastr.error('Falha ao cadastrar Atividade ', 'SUCESSO');
      })

  }

  delete(){

    const id = this.atividadeSelected?.id

    this.tasksService.delete(id)
    .subscribe(
      atividade => {
        this.toastr.warning("Atividade Deletada com sucesso!", "SUCESSO", {positionClass: "toast-top-right"})
      },
      err => {
        this.toastr.error("Falha ao deletar Atividade. Tente novamente!", "ERRO", {positionClass: "toast-top-right"})
      }
    )


  }

  getAtividades(){

    this.tasksService.all()
      .subscribe(tasks => {
        this.atividades = tasks
      },
      err => {
        this.toastr.error('Falha ao buscar atividades. Tente Novamente!', 'ERRO')
      })


  }

  getCategories(){

    this.tasksService.listCategories()
      .subscribe(categories => {
        this.categories = categories
      },
      err => {
        this.toastr.error('Falha ao buscar Categorias de Atividades. Tente Novamente!', 'ERRO')
      })

  }

  

  confirmationDelete() {
    this.fn(...this.paramsDelete);
  }

  private getDismissReason(reason: any): string {


    this.successAtividade = false;
    this.submittedAtividade = false;


    this.addAtividadesForm.reset()
    this.addAtividadesForm.setErrors(null)
    
    this.editAtividadesForm.reset()
    this.editAtividadesForm.setErrors(null)   

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  

}
