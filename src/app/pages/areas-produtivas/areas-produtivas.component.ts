import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProductiveAreasService } from 'src/app/services/productive-areas.service';
import { VarietiesService } from 'src/app/services/varieties.service';

@Component({
  selector: 'app-areas-produtivas',
  templateUrl: './areas-produtivas.component.html',
  styleUrls: ['./areas-produtivas.component.scss']
})
export class AreasProdutivasComponent implements OnInit {

  closeResult = '';

  public addAreasProdutivasForm : FormGroup;
  public editAreasProdutivasForm : FormGroup;


  public metaCustoForm: FormGroup;
  public metaProdutividadeForm: FormGroup;


  public submittedArea: Boolean;
  public successArea: Boolean;

  public areaSelected: any;


  fn: any;
  paramsDelete: any;

  //entidades
  public areas;
  public variedades;
  public safras;
  public prunnings;
  public metas_custo;
  public metas_produtividade;

 
  constructor(
    private modalService: NgbModal,
    private productiveAreaService: ProductiveAreasService,
    private varietiesService: VarietiesService,
    private toastr: ToastrService
  ) {

    




  }

  ngOnInit(): void {

    this.addAreasProdutivasForm = new FormGroup({
      name: new FormControl(null,[Validators.required, Validators.required]),
      variety_id: new FormControl(null, [ Validators.required]),
      size: new FormControl(null, [ Validators.nullValidator]),
      quantity_lines: new FormControl(null, [ Validators.nullValidator]),
      quantity_plants: new FormControl(null, [ Validators.nullValidator]),
      porta_enxerto: new FormControl(null, [ Validators.nullValidator]),
      spacing: new FormControl(null, [ Validators.nullValidator]),
      planting_at: new FormControl(null, [ Validators.nullValidator]),
    })

    this.editAreasProdutivasForm = new FormGroup({
      name: new FormControl(null,[Validators.required, Validators.required]),
      variety_id: new FormControl(null, [ Validators.required]),
      size: new FormControl(null, [ Validators.nullValidator]),
      quantity_lines: new FormControl(null, [ Validators.nullValidator]),
      quantity_plants: new FormControl(null, [ Validators.nullValidator]),
      porta_enxerto: new FormControl(null, [ Validators.nullValidator]),
      spacing: new FormControl(null, [ Validators.nullValidator]),
      planting_at: new FormControl(null, [ Validators.nullValidator]),
    })

    this.metaCustoForm = new FormGroup({
      safra_id: new FormControl(null, [Validators.required]),
      value: new FormControl(null, [Validators.required])
    })

    this.metaProdutividadeForm = new FormGroup({
      safra_id: new FormControl(null, [Validators.required]),
      value: new FormControl(null, [Validators.required])
    })

    this.getProductiveAreas()
    this.getVarieties()

  }

  get addForm(){
    return this.addAreasProdutivasForm.controls
  }

  get editForm(){
    return this.editAreasProdutivasForm.controls
  }

  create(){
    this.submittedArea = true
    this.successArea = false;

    if (this.addAreasProdutivasForm.invalid)
      return;

    
    const atividade = this.addAreasProdutivasForm.value

    this.productiveAreaService.create(atividade)
      .subscribe(atividade => {


        this.addAreasProdutivasForm.reset()
        this.addAreasProdutivasForm.setErrors(null)

        this.submittedArea = false
        this.successArea = true;

        this.toastr.success('Atividade Cadastrada', 'SUCESSO');
        this.getProductiveAreas();

      },
      err => {
        this.toastr.error('Falha ao cadastrar Atividade ', 'SUCESSO');
      })
    
  }

  onEditAreasProdutivas(area){

    this.editAreasProdutivasForm.controls['name'].setValue(area?.name)
    this.editAreasProdutivasForm.controls['variety_id'].setValue(area?.variety_id)
    this.editAreasProdutivasForm.controls['size'].setValue(area?.size)
    this.editAreasProdutivasForm.controls['quantity_lines'].setValue(area?.quantity_lines)
    this.editAreasProdutivasForm.controls['quantity_plants'].setValue(area?.quantity_plants)
    this.editAreasProdutivasForm.controls['porta_enxerto'].setValue(area?.porta_enxerto)
    this.editAreasProdutivasForm.controls['spacing'].setValue(area?.spacing)
    this.editAreasProdutivasForm.controls['planting_at'].setValue(area?.planting_at)
    
    this.areaSelected = area

  }


  update(){


    this.submittedArea = true
    this.successArea = false;

    if (this.editAreasProdutivasForm.invalid)
      return;

    
    const area = this.editAreasProdutivasForm.value

    this.productiveAreaService.edit(this.areaSelected?.id, area)
      .subscribe(area => {

        this.addAreasProdutivasForm.reset()
        this.addAreasProdutivasForm.setErrors(null)

        this.submittedArea = false
        this.successArea = true;

        this.toastr.info('Area Produtiva Atualizada', 'SUCESSO');
        this.getProductiveAreas();

      },
      err => {
        this.toastr.error('Falha ao Atualizar Area Produtiva', 'SUCESSO');
      })

  }


  getProductiveAreas(){


    this.productiveAreaService.all()
      .subscribe(areas => {
        this.areas = areas
      },
      err => {
        this.toastr.error('Falha ao buscar Areas Produtivas. Tente Novamente!', 'ERRO')
      })

  }

  getVarieties(){


    this.varietiesService.all()
      .subscribe(variedades => {
        this.variedades = variedades
      },
      err => {
        this.toastr.error('Falha ao buscar Variedades. Tente Novamente!', 'ERRO')
      })

  }


  removerAreaProdutiva(id: Number){

  
    this.productiveAreaService.delete(id)
    .subscribe(
      Fornecedor => {
        this.toastr.warning("Area Produtiva Deletada com sucesso!", "SUCESSO", {positionClass: "toast-top-right"})
        this.getProductiveAreas()
      },
      err => {
        this.toastr.error("Falha ao deletar Area Produtiva. Tente novamente!", "ERRO", {positionClass: "toast-top-right"})
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


    this.successArea = false;
    this.submittedArea = false;


    this.addAreasProdutivasForm.reset()
    this.addAreasProdutivasForm.setErrors(null)
    
    this.editAreasProdutivasForm.reset()
    this.editAreasProdutivasForm.setErrors(null)   

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
