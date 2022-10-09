import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { GoalService } from 'src/app/services/goals.service';
import { ProductiveAreasService } from 'src/app/services/productive-areas.service';
import { PrunningService } from 'src/app/services/prunning.service';
import { SafrasService } from 'src/app/services/safras.service';
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


  public metaForm: FormGroup;
  public prunningForm: FormGroup;


  public submittedArea: Boolean;
  public successArea: Boolean;

  public submittedMeta: Boolean = false;
  public successMeta: Boolean = false;


  public submittedPrunning = false
  public successPrunning = false;


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

  private infoArea;

 
  constructor(
    private modalService: NgbModal,
    private productiveAreaService: ProductiveAreasService,
    private varietiesService: VarietiesService,
    private safraService: SafrasService,
    private goalsService: GoalService,
    private prunningService: PrunningService,
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

    this.metaForm = new FormGroup({
      safra_id: new FormControl(null, [Validators.required]),
      value: new FormControl(null, [Validators.required])
    })

   

    this.prunningForm = new FormGroup({
      safra_id: new FormControl(null, [Validators.required]),
      prunning_at: new FormControl(null, [Validators.required])
    })


    this.getProductiveAreas()
    this.getVarieties()

    this.getSafras();
    

  }

  get addForm(){
    return this.addAreasProdutivasForm.controls
  }

  get editForm(){
    return this.editAreasProdutivasForm.controls
  }

  get pf(){
    return this.prunningForm.controls
  }

  get meta(){
    return this.metaForm.controls
  }

  selectedOption(index){

    console.log(index)
    return index == 0;


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

  setArea(area){
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

        this.submittedArea = false
        this.successArea = true;

        this.toastr.info('Area Produtiva Atualizada', 'SUCESSO');
        this.getProductiveAreas();
        this.getInfoArea(this.areaSelected?.id)

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

  async getInfoArea(id: Number){

    await  this.productiveAreaService.infoArea(id)
      .subscribe( infoArea => {
        this.infoArea = infoArea
      },
      err => {
        this.toastr.error("Falha ao buscar informações da Area Produtiva. Tente novamente!", "ERRO", {positionClass: "toast-top-right"})
      })

  }

  getSafras(){

    this.safraService.all()
      .subscribe( safras => {
        this.safras = safras
      },
      err => {
        this.toastr.error("Falha ao buscar informações de Safras. Tente novamente!", "ERRO", {positionClass: "toast-top-right"})
      })

  }

  createPrunning(){

    this.submittedPrunning = true
    this.successPrunning = false;

    if (this.prunningForm.invalid)
      return;

    
    let prunning = this.prunningForm.value
    prunning['productive_area_id'] = this.areaSelected?.id;


    this.prunningService.create(prunning)
      .subscribe(prunning => {
    
        this.prunningForm.reset()
        this.prunningForm.setErrors(null)

        this.submittedPrunning = false
        this.successPrunning = true;

        this.toastr.success("Poda definida com Sucesso!", "SUCESSO")


      }, err => {
        this.toastr.error("Falha definir a data da PODA. Tente novamente!", "ERRO")
      })



  }

  createMeta(type: string){

    this.submittedMeta = true
    this.successMeta = false;

    if (this.metaForm.invalid)
      return;

    
    let meta = this.metaForm.value
    meta['productive_area_id'] = this.areaSelected?.id;
    meta['type'] = type


    this.goalsService.create(meta)
      .subscribe(prunning => {
    
        this.submittedMeta = false
        this.successMeta = true;

        this.toastr.success("Meta definida com Sucesso!", "SUCESSO")

        this.getInfoArea(this.areaSelected?.id);


      }, err => {
        this.toastr.error("Falha definir a Meta. Tente novamente!", "ERRO")
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

    console.log('oi')

    setTimeout(() => {}, 500);




    const safra_id = this?.safras[0]?.id 

    

    this.prunningForm.controls['safra_id'].setValue(safra_id);
    this.metaForm.controls['safra_id'].setValue(safra_id);

    const typeMeta = fn;

    if (typeMeta == 'PRUNNING')
      this.changePrunning(safra_id)

    if (typeMeta == 'CUSTO')
      this.changeMetaCusto(safra_id)

    if (typeMeta == 'PRODUTIVIDADE')
      this.changeMetaCusto(safra_id)

    

   

   
   // this.a.controls['safra_id'].setValue(this?.safras?.slice(-1)[0]?.prunning_at);
    


    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', 'centered': true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    //delete params
    this.fn = fn;
    this.paramsDelete = params;

    




  }

  changePrunning(safra_id: Number) {


    
    const prunning = this.infoArea[0]?.prunnings?.filter(item => item.safra_id == safra_id)



    if (prunning){
      this.prunningForm.controls['prunning_at'].setValue(prunning[0]?.prunning_at)
    }

  
  }

  changeMetaProdutividade(safra_id: Number) {

    
    const produtividade = this.infoArea[0]?.goals?.filter(
      item => item.safra_id == safra_id && item.type == 'PRODUTIVIDADE'
    )

    if (produtividade){
      this.metaForm.controls['value'].setValue(produtividade[0]?.value)
    }

  
  }

  changeMetaCusto(safra_id: Number) {

    
    const custo = this.infoArea[0]?.goals?.filter(
      item => item.safra_id == safra_id && item.type == 'CUSTO'
    )

    if (custo){
      this.metaForm.controls['value'].setValue(custo[0]?.value)
    }

  
  }

  private getDismissReason(reason: any): string {


    this.successArea = false;
    this.submittedArea = false;

    this.successMeta  = false;
    this.submittedMeta = false;


    this.addAreasProdutivasForm.reset()
    this.addAreasProdutivasForm.setErrors(null)
    
    this.editAreasProdutivasForm.reset()
    this.editAreasProdutivasForm.setErrors(null)   

    this.metaForm.reset()
    this.metaForm.setErrors(null)  

    this.prunningForm.reset()
    this.prunningForm.setErrors(null)  

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
