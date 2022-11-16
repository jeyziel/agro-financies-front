import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustoCategoria } from 'src/app/interfaces/dashboard/custo-categorias';
import { CustoItem } from 'src/app/interfaces/dashboard/custo-itens';
import { CustoMensal } from 'src/app/interfaces/dashboard/custo-mensal';

import { IndicativoIndividual } from 'src/app/interfaces/dashboard/indicativos';
import { InformacoesGerais } from 'src/app/interfaces/dashboard/informacoes-gerais';
import { ConsumptionService } from 'src/app/services/consumption.service';
import { DashboardIndividualService } from 'src/app/services/dashboard-individual.service';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.scss']
})
export class IndividualComponent implements OnInit {

 
  @Input() filters;

  public infoArea: any;
  public custosCategoria: any;
  public expensesByMonth: any;
  public vendas: any;
  public expensesByItens: any;
  public comsuptions: any;
  public itensCustos: any;
  public custoMensais: any;


  public indicativos: IndicativoIndividual
  public informacoes_gerais: InformacoesGerais
  public custo_categorias : CustoCategoria[]
  public custo_mensal: CustoMensal[] 


  constructor(
    private individualService : DashboardIndividualService,
    private comsuptionService: ConsumptionService,
    private toastr: ToastrService
  ){}

  async ngOnInit(): Promise<any> {

    const idArea = this.filters?.productive_area_id;
    const safra = {
      safra_id: this.filters?.safra_id
    }


    await this.allData(idArea, safra)
    
  }

 

  async allData(idArea: Number, safra){

    const infoArea =   await this.getInfoArea(idArea, safra)
    const vendas =  await this.getVendas(idArea, safra)
    const custosCategoria =  await this.getCategoriaCustos(idArea, safra)

    const custoMensais = await this.getCustoMensais(idArea, safra)
   // const consumo = await this.getConsumos()

    const itensCusto = await this.getItensCustos(idArea, safra)

    Promise.all([infoArea, vendas, custosCategoria, custoMensais, itensCusto]).then(
      data => {
        
        this.infoArea = data[0]
        this.vendas = data[1]
        this.custosCategoria = data[2]
        this.custoMensais = data[3]
        const itens = data[4]

        this.indicativos = this.makeIndicativos(this.infoArea, this.vendas, this.custosCategoria)
        this.informacoes_gerais = this.makeInformacoesGerais(this.infoArea, this.vendas, this.custosCategoria)
        this.custo_categorias = this.makeCategoriasCustos(custosCategoria)
        this.itensCustos = this.makeCustoItens(itens)


        this.custo_mensal = this.makeCustosMensais(custoMensais)


        console.log(this.custo_mensal)

    


      },
      err => {
        this.toastr.error('Falha ao montar Dashboard! Tente novamente ', 'erro')
      }
    )

  

    

  }

  public makeIndicativos(infoArea, vendas, categoriasCusto): IndicativoIndividual{

    const area = infoArea[0];
    const data_poda = area?.prunnings[0].prunning_at

    const objetivo_custo = area.goals.filter(item => item.type == "CUSTO")[0]?.value || 0
    const total_custo = categoriasCusto?.map( item => item.total)
      .reduce( (prev, curr ) => prev + curr, 0)

    const producao = {
      valor: vendas[0]?.total ?? 0,
      quantidade: vendas[0]?.quantity ?? 0
    }

    const custo = {
      valor: total_custo ?? 0,
      objetivo: objetivo_custo ?? 0
    }

    return {
      producao: producao,
      custo: custo,
      data_poda: data_poda
    }

  }

  public makeInformacoesGerais(infoArea, vendas, categoriasCusto ): InformacoesGerais{


    const area = infoArea[0]

    const objetivo_custo = area.goals.filter(item => item.type == "CUSTO")[0]?.value || 0
    const total_custo = categoriasCusto?.map( item => item.total)
      .reduce( (prev, curr ) => prev + curr, 0)


    const objetivo_vendas = area.goals.filter(item => item.type == "PRODUTIVIDADE")[0]?.value || 0

    const producao = {
      valor: vendas[0]?.total ?? 0,
      objetivo: objetivo_vendas ?? 0
    }

    const custo = {
      valor: total_custo ?? 0,
      objetivo: objetivo_custo ?? 0
    }

    return {
      cultura: area?.variety?.culture?.name,
      variedade: area?.variety?.name,
      quantidade_linhas: area?.quantity_lines,
      quantidade_plantas: area?.quantity_plants,
      porta_enxerto: area?.porta_enxerto,
      espacamento: area?.spacing,
      tamanho: area?.tamanho,
      data_plantio: area?.planting_at,
      producao: producao,
      custo: custo
    }

  }

  public makeCategoriasCustos(categoriasCusto) : CustoCategoria[]{

    const total = categoriasCusto.reduce((prev, curr) =>  prev + curr?.total, 0)


    let categorias: CustoCategoria[] = []

    categoriasCusto.forEach( categoria => categorias.push({
      nome: categoria?.name,
      valor: categoria?.total,
      percentual: ((categoria?.total / total) * 100).toFixed(2)
    }))


    return categorias

  }

  getLabelsCustoCategoria(){


    let labels = []

    this.custo_categorias?.forEach((item: CustoCategoria) => {

      labels.push(item?.nome)

    });

    console.log('labels', labels)

    return labels

  }

  getDataCustoCategoria(){

    const total = this.custo_categorias.map( item => Number(item?.valor))
      .reduce( (prev, curr ) => prev + curr, 0)

    let data = []

    this.custo_categorias?.forEach((item: CustoCategoria) => {

      let valor: Number = Number(item?.valor)
      let percentual = parseFloat(((Number(valor) / total) * 100).toFixed(2))
      data.push(percentual)

    });


    return data


  }


  public makeCustosMensais(custoMensais) : CustoMensal[]{


    let items: CustoMensal[] = []


    custoMensais.map(item => items.push({

      mes: this.normalizeMonth(item?.month),
      total: item?.total

    }))

    return items;

  }


  public normalizeMonth(custoMensais){

    const split_month = custoMensais.split('-')
    const ano = split_month[0]
    const mes = parseInt(split_month[1]) - 1

    const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']

    return `${meses[mes]}/${ano}`

  }

  public makeCustoItens(custoItens) : CustoItem[]{

    let itens : CustoItem[] = []

    custoItens?.forEach(function(item){

      itens.push({
        nome: item.name,
        total: item.total
      })

    })


    return itens


  }

  getLabelsCustoMensal(){


    let labels = []

    this?.custo_mensal?.forEach((item: CustoMensal) => {

      labels.push(item?.mes)

    });

    return labels

  }

  getDataCustoMensal(){

    let data = []

    this.custo_mensal?.forEach((item: CustoMensal) => {

      data.push(item?.total)

    });

    return data

  }


  async getInfoArea(id: Number, safra: any){

    return  this.individualService.infoArea(id, safra).toPromise()

  }

  async getVendas(id: Number, safra: any){

    return this.individualService.vendas(id, safra).toPromise();

  }

  async getCategoriaCustos(id: Number, safra: any){

    return this.individualService.custosCategoria(id, safra).toPromise()
   
  }

  async getCustoMensais(id: Number, safra: any){

    return this.individualService.custosMensais(id, safra).toPromise()

  }

  async getItensCustos(id: Number, safra: any){

    return this.individualService.custosItens(id, safra).toPromise()
   
  }

  getConsumos(){

    this.comsuptionService.all().toPromise()
      // .subscribe(consumos => {
      //   this.consumos = consumos
      // }, err => {

      // })


  }



}