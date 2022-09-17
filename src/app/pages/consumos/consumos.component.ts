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

  public produtos;
  public areas;
  public safras;
  public funcionarios;
  
  public unidadesArea;
  public atividades;

  constructor(
    private modalService: NgbModal,
    private consumptionService: ConsumptionService,
    private tasksDoneService: TasksService,
    private tasksService: TasksService,
    private productsService: ProductsService,
    private safraService: SafrasService,
    private areasProdutivasService: ProductiveAreasService,
    private funcionariosService: EmployeeService,
    private toastr: ToastrService
  )

    
    { }

 

  ngOnInit(): void {

    this.addAtividades = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      price_default: new FormControl(null, [Validators.required]),
      task_category_id: new FormControl(null, [Validators.required])
    })

    this.addConsumoProdutoForm = new FormGroup({
      product_id: new FormControl(null, [Validators.required]),
      productive_area_id: new FormControl(null, [Validators.required]),
      safra_id: new FormControl(null, [Validators.required]),
      quantity: new FormControl(1, [Validators.required]),
      employee_id: new FormControl(null, [Validators.required]),
      consumption_at: new FormControl(null, [Validators.required])
    });


    this.getConsumos()
    this.getTasksDone()


    this.getProdutos()
    this.getSafras()
    this.getAreasProdutivas()
    this.getFuncionarios();

    //this.addConsumoProdutoForm.controls['safra_id'].setValue(this.safras[0], {onlySelf: true});
  }

  get c(){
    return this.addConsumoProdutoForm.controls
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
        this.toastr.error('Falha ao cadastrar Atividade ', 'SUCESSO');
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

    this.tasksDoneService.getTasksDones()
      .subscribe(tasksDone => {
        this.tasksDone = tasksDone
      },
      err => {

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
