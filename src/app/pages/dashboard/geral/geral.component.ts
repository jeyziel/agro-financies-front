import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustoCategoria } from 'src/app/interfaces/dashboard/custo-categorias';
import { CustoItem } from 'src/app/interfaces/dashboard/custo-itens';
import { CustoMensal } from 'src/app/interfaces/dashboard/custo-mensal';
import { IndicativoIndividual } from 'src/app/interfaces/dashboard/indicativos';
import { InformacoesDetalhadas } from 'src/app/interfaces/dashboard/informacoes-detalhadas';
import { InformacoesGerais } from 'src/app/interfaces/dashboard/informacoes-gerais';
import { DashboardGeralService } from 'src/app/services/dashboard-geral.service';

@Component({
  selector: 'app-geral',
  templateUrl: './geral.component.html',
  styleUrls: ['./geral.component.scss']
})
export class GeralComponent implements OnInit {

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

  public informacoes_detalhadas : InformacoesDetalhadas[]



  constructor(
    private geralService : DashboardGeralService,
   private toastr: ToastrService
  )
    
    { 

    }

  async ngOnInit(){

    const safra = {
      safra_id: this.filters?.safra_id
    }


    await this.allData(safra)
    
  }

 
  



  async allData( safra){

    const infoArea =   await this.getInfoArea(safra)
    const vendas =  await this.getVendas(safra)
    const custosCategoria =  await this.getCategoriaCustos(safra)

    const custoMensais = await this.getCustoMensais(safra)
   // const consumo = await this.getConsumos()

    const itensCusto = await this.getItensCustos(safra)



    Promise.all([infoArea, vendas, custosCategoria, custoMensais, itensCusto]).then(
      data => {
        
        this.infoArea = data[0]
        this.vendas = data[1]
        this.custosCategoria = data[2]
        this.custoMensais = data[3]
        const itens = data[4]

        this.indicativos = this.makeIndicativos(this.infoArea, this.vendas, this.custosCategoria)

        this.custo_categorias = this.makeCategoriasCustos(custosCategoria)
        this.itensCustos = this.makeCustoItens(itens)
        this.custo_mensal = this.makeCustosMensais(custoMensais)

        this.informacoes_detalhadas = this.makeInformacoesDetalhadas(this.infoArea)

        console.log(this.informacoes_detalhadas)

      },
      err => {
        this.toastr.error('Falha ao montar Dashboard! Tente novamente ', 'erro')
      }
    )


  }

  
  async getInfoArea(safra: any){

    return  this.geralService.infoArea(safra).toPromise()

  }

  async getVendas(safra: any){

    return this.geralService.vendas(safra).toPromise();

  }

  async getCategoriaCustos(safra: any){

    return this.geralService.custosCategoria(safra).toPromise()
   
  }

  async getCustoMensais(safra: any){

    return this.geralService.custosMensais(safra).toPromise()

  }

  async getItensCustos(safra: any){

    return this.geralService.custosItens(safra).toPromise()
   
  }

  getConsumos(){

    //this.comsuptionService.all().toPromise()
      // .subscribe(consumos => {
      //   this.consumos = consumos
      // }, err => {

      // })


  }


  public makeIndicativos(infoArea, vendas, categoriasCusto): IndicativoIndividual{

    const total_custo = categoriasCusto?.map( item => item.total)
      .reduce( (prev, curr ) => prev + curr, 0)

    const vendas_total = vendas?.map( item => item.total)
      .reduce( (prev, curr) => prev + curr, 0 )


    const vendas_quantidade = vendas?.map( item => parseFloat(item.quantity))
      .reduce( (prev, curr) => prev + curr, 0 )

    const quantidade_area = infoArea?.length;
    const total_hectares = infoArea?.map( item => item.size)
      .reduce( (prev, curr) => prev + curr, 0 )
    
    const custo_por_hectare = parseFloat((total_custo / total_hectares).toFixed(2))


    const producao = {
      valor: vendas_total ?? 0,
      quantidade: vendas_quantidade ?? 0
    }

    const custo = {
      valor: total_custo ?? 0,
      objetivo: 0
    }

    const area = {
      quantidade: quantidade_area,
      tamanho: total_hectares,
      custo_medio: custo_por_hectare
    }


    return {
      producao: producao,
      custo: custo,
      area: area
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

  public makeInformacoesDetalhadas(infoArea): InformacoesDetalhadas[]{

    let informacoesDetalhadas: InformacoesDetalhadas[] = []

    infoArea.forEach(function(area){

      const objetivo_custo = area.goals.filter(item => item.type == "CUSTO")[0]?.value || 0
      const total_custo = area?.custos?.map( item => item.total)
        .reduce( (prev, curr ) => prev + curr, 0)

      const data_poda = area?.prunnings[0]?.prunning_at

      const objetivo_vendas = area.goals.filter(item => item.type == "PRODUTIVIDADE")[0]?.value || 0
      
      
      const quantidade_vendas =  area?.sales?.map( item => parseInt(item.quantity))
        .reduce( (prev, curr ) => prev + curr, 0)

      const total_producao = area?.sales?.map( item => item.total)
        .reduce( (prev, curr ) => prev + curr, 0)
   

      const producao = {
        quantidade: quantidade_vendas ?? 0,
        valor: total_producao ?? 0,
        objetivo: objetivo_vendas ?? 0
      }



      const custo = {
        valor: total_custo ?? 0,
        objetivo: objetivo_custo ?? 0,
        categorias: area?.custos
      }

      const dados =  {
        id: area?.id,
        name: area?.name, 
        cultura: area?.variety?.culture?.name,
        variedade: area?.variety?.name,
        quantidade_linhas: area?.quantity_lines,
        quantidade_plantas: area?.quantity_plants,
        porta_enxerto: area?.porta_enxerto,
        espacamento: area?.spacing,
        tamanho: area?.size,
        data_poda: data_poda,
        data_plantio: area?.planting_at,
        producao: producao,
        custo: custo
      }

      informacoesDetalhadas.push(dados);

      



    });


    return informacoesDetalhadas;


  }





}
