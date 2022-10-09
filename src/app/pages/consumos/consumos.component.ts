import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConsumptionService } from 'src/app/services/consumption.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProductiveAreasService } from 'src/app/services/productive-areas.service';
import { ProductsService } from 'src/app/services/products.service';
import { SafrasService } from 'src/app/services/safras.service';
import { TasksService } from 'src/app/services/tasks.service';


@Component({
  selector: 'app-consumos',
  templateUrl: './consumos.component.html',
  styleUrls: ['./consumos.component.scss']
})
export class ConsumosComponent implements OnInit {

  closeResult = '';
  public addAtividades : FormGroup;
  public consumos: any[];
  public tasksDone: any[];

  //formulários
  public addConsumoProdutoForm;
  public addConsumoAtividadeForm;

  public submittedConsumoProduto: Boolean
  public successConsumoProduto: Boolean

  public submittedConsumoAtividade: Boolean
  public successConsumoAtividade: Boolean

  public produtos;
  public areas;
  public safras;
  public funcionarios;
  
  public unidadesArea;
  public atividades;

  constructor(
    private modalService: NgbModal,
    private consumptionService: ConsumptionService,
    private tasksService: TasksService,
    private productsService: ProductsService,
    private safraService: SafrasService,
    private areasProdutivasService: ProductiveAreasService,
    private funcionariosService: EmployeeService,
    private toastr: ToastrService
  )

    
    { }

 

  ngOnInit(): void {

    

    this.addConsumoProdutoForm = new FormGroup({
      product_id: new FormControl(null, [Validators.required]),
      productive_area_id: new FormControl(null, [Validators.required]),
      safra_id: new FormControl(null, [Validators.required]),
      quantity: new FormControl(1, [Validators.required]),
      employee_id: new FormControl(null, [Validators.required]),
      consumption_at: new FormControl(null, [Validators.required])
    });

    this.addConsumoAtividadeForm = new FormGroup({
      task_id: new FormControl(null, [Validators.required]),
      productive_area_ids: new FormControl(null, [Validators.required]),
      area_unit_id: new FormControl(null, [Validators.required]),
      safra_id: new FormControl(null, [Validators.required]),
      quantity: new FormControl(1, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      employee_id: new FormControl(null, [Validators.required]),
      done_at: new FormControl(null, [Validators.required])
    });

    


    this.getConsumos()
    this.getTasksDone()


    this.getProdutos()
    this.getSafras()
    this.getAreasProdutivas()
    this.getFuncionarios();
    this.getAtividades();
    this.getAreasUnidade();

    this.addConsumoAtividadeForm.get('task_id').valueChanges.subscribe(value => {
 

      const atividade = this.atividades.filter(atividade => atividade.id == value)
      console.log(atividade)

      this.addConsumoAtividadeForm.controls['price'].setValue(atividade[0]?.price_default)
   })

    //this.addConsumoProdutoForm.controls['safra_id'].setValue(this.safras[0], {onlySelf: true});
  }

  get c(){
    return this.addConsumoProdutoForm.controls
  }

  get t(){
    return this.addConsumoAtividadeForm.controls
  }

  

  create(){

    this.submittedConsumoProduto = true
    this.successConsumoProduto = false;

    if (this.addConsumoProdutoForm.invalid)
      return;

    
    const consumo = this.addConsumoProdutoForm.value

    this.consumptionService.create(consumo)
      .subscribe(consumo => {


        this.addConsumoProdutoForm.reset()
        this.addConsumoProdutoForm.setErrors(null)

        this.submittedConsumoProduto = false
        this.successConsumoProduto = true;

        this.toastr.success('Produto Consumido', 'SUCESSO');
        this.getConsumos();

      },
      err => {
        this.toastr.error('Falha ao cadastrar Atividade ', 'ERRO');
      })

  }

  consumirAtividade(){

    this.submittedConsumoAtividade = true
    this.successConsumoAtividade = false;

    if (this.addConsumoAtividadeForm.invalid)
      return;

    
    const consumo = this.addConsumoAtividadeForm.value

    this.tasksService.createTaskDone(consumo)
      .subscribe(consumo => {


        this.addConsumoAtividadeForm.reset()
        this.addConsumoAtividadeForm.setErrors(null)

        this.submittedConsumoAtividade = false
        this.successConsumoAtividade = true;

        this.toastr.success('Atividade Registrada', 'SUCESSO');
        this.getConsumos();

      },
      err => {
        this.toastr.error('Falha ao Registrar Atividade ', 'SUCESSO');
      })



  }


  getConsumos(){

    this.consumptionService.all()
      .subscribe(consumos => {
        this.consumos = consumos
      },
      err => {

      })

  }

  getTasksDone(){

    this.tasksService.getTasksDones()
      .subscribe(tasksDone => {
        this.tasksDone = tasksDone
      },
      err => {
        this.toastr.error('Falha ao buscar Atividades Realizadas. Tente Novamente!', 'ERRO')
      })
  }

  getSafras(){

    this.safraService.all()
      .subscribe(safras => {
        this.safras = safras
      },
      error => {
        this.toastr.error('Falha ao buscar Safras. Tente Novamente!', 'ERRO')
      })


  }

  getAreasProdutivas(){


    this.areasProdutivasService.all()
      .subscribe(areas => {
        this.areas = areas
      },
      err => {
        this.toastr.error('Falha ao buscar Areas Produtivas. Tente Novamente!', 'ERRO')
      })

  }


  getFuncionarios(){

    this.funcionariosService.all()
      .subscribe(funcionarios => {
        this.funcionarios = funcionarios
      },
      err => {
        this.toastr.error('Falha ao buscar Funcionarios. Tente Novamente!', 'ERRO')
      })

  }

  getProdutos(){

      this.productsService.all()
      .subscribe(produtos => {
        this.produtos = produtos;
      },
      err => {
        this.toastr.error('Falha ao buscar Produtos. Tente Novamente!', 'ERRO')
      })

  }

  
  getAreasUnidade(){


    this.areasProdutivasService.units()
      .subscribe(unidadesArea => {
        this.unidadesArea = unidadesArea
      },
      err => {
        this.toastr.error('Falha ao buscar Unidades das Áreas Produtivas. Tente Novamente!', 'ERRO')
      })

  }


  getAtividades(){

    this.tasksService.all()
      .subscribe(atividades => {
        this.atividades = atividades
      },
      err => {
        this.toastr.error('Falha ao buscar Atividades. Tente Novamente!', 'ERRO')
      })


  }


  onChangeAtividade(atividade){

    console.log(atividade)

    this.addConsumoAtividadeForm.controls['price'].setValue(atividade?.price_default);

  }



  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }



  private getDismissReason(reason: any): string {


    this.successConsumoProduto = false;
    this.submittedConsumoProduto = false;


    this.addConsumoProdutoForm.reset()
    this.addConsumoProdutoForm.setErrors(null)
    
    this.addConsumoAtividadeForm.reset()
    this.addConsumoAtividadeForm.setErrors(null)   

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
