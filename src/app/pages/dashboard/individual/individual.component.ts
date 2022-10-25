import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustoCategoria } from 'src/app/interfaces/dashboard/custo-categorias';
import { CustoMensal } from 'src/app/interfaces/dashboard/custo-mensal';

import { IndicativoIndividual } from 'src/app/interfaces/dashboard/indicativos';
import { InformacoesGerais } from 'src/app/interfaces/dashboard/informacoes-gerais';
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
  public custo_categorias : CustoCategoria
  public custo_mensal: CustoMensal 


  constructor(
    private individualService : DashboardIndividualService,
    private toastr: ToastrService
    )
    
    { 

    }

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
    const itensCusto = await this.getItensCustos(idArea, safra)

    Promise.all([infoArea, vendas, custosCategoria, custoMensais, itensCusto]).then(
      data => {
        
        this.infoArea = data[0]
        this.vendas = data[1]
        this.custosCategoria = data[2]
        this.custoMensais = data[3]
        this.itensCustos = data[4]

        this.indicativos = this.makeIndicativos(this.infoArea, this.vendas, this.custosCategoria)
        this.informacoes_gerais = this.makeInformacoesGerais(this.infoArea, this.vendas, this.custosCategoria)
        this.custo_categorias = this.makeCategoriasCustos(custosCategoria)
        this.custo_mensal = this.makeCustosMensais(custoMensais)
    


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

  public makeCategoriasCustos(categoriasCusto) : CustoCategoria{


    const total = categoriasCusto.reduce((curr, prev) =>  curr?.total + prev?.total, 0)


    const categorias = categoriasCusto.map( categoria => {
      name: categoria?.name
      valor: categoria?.total
      percentual: (categoria?.total / total).toFixed(2)
    })

    return categorias

  }

  public makeCustosMensais(custoMensais) : CustoMensal{

    return custoMensais.map(item => {

      mes: this.normalizeMonth(item)
      total: item?.total

    })

  }


  public normalizeMonth(custoMensais){

    const split_month = custoMensais.split('-')
    const mes = split_month[0]
    const ano = split_month[1]

    const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']

    return `${meses[mes]}/${ano}`

  }








  async getInfoArea(id: Number, safra: any){

    return  this.individualService.infoArea(id, safra).toPromise()



      // .subscribe(info => {
      //     this.infoArea = info
      //     console.log('info 1', this.infoArea)
      // },
      // err => {
      //   this.toastr.error("Falha ao buscar informações da Área", "Error")
      // }
      // )


  }

  async getVendas(id: Number, safra: any){

    return this.individualService.vendas(id, safra).toPromise();

      // .subscribe(vendas => {
      //     this.vendas = vendas
      // },
      // err => {
      //   this.toastr.error("Falha ao buscar informações de vendas", "Error")
      // }
      // )


  }

  async getCategoriaCustos(id: Number, safra: any){

    return this.individualService.custosCategoria(id, safra).toPromise()
    // .subscribe(custos => {
    //     this.custosCategoria = custos
    // },
    // err => {
    //   this.toastr.error("Falha ao buscar informações de vendas", "Error")
    // }
    // )


  }

  async getCustoMensais(id: Number, safra: any){

    return this.individualService.custosMensais(id, safra)
      .subscribe(custos => {
          this.expensesByMonth = custos
      },
      err => {
        this.toastr.error("Falha ao buscar informações de custos mensais", "Error")
      }
    )

  }

  async getItensCustos(id: Number, safra: any){

    
    return this.individualService.custosItens(id, safra)
      .subscribe(custos => {
          this.expensesByItens = custos
      },
      err => {
        this.toastr.error("Falha ao buscar informações de custo por itens", "Error")
      }
    )

  }

  public getConsumos(){

    
  

  }



}
