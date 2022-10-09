import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IndicativoIndividual } from 'src/app/interfaces/dashboard/indicativos';
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


  public indicativos: IndicativoIndividual


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

    console.log(1)

    await this.allData(idArea, safra)

    

    console.log(2)
    

    console.log(this.infoArea)

    console.log(3)
    
  }

 

  async allData(idArea: Number, safra){

    const infoArea =   await this.getInfoArea(idArea, safra)
    const vendas =  await this.getVendas(idArea, safra)
    const custosCategoria =  await this.getCategoriaCustos(idArea, safra)

    // // const custoMensais = await this.getCustoMensais(idArea, safra)
    // // const itensCusto = await this.getItensCustos(idArea, safra)



    Promise.all([infoArea, vendas, custosCategoria]).then(
      data => {
        
        this.infoArea = data[0]
        this.vendas = data[1]
        this.custosCategoria = data[2]

        this.indicativos = this.makeIndicativos(this.infoArea, this.vendas, this.custosCategoria)

        console.log(this.indicativos)


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

  public makeInformacoesGerais(infoArea, vendas, categoriasCusto ){




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
