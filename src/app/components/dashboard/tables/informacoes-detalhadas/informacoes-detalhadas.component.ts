import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-informacoes-detalhadas',
  templateUrl: './informacoes-detalhadas.component.html',
  styleUrls: ['./informacoes-detalhadas.component.scss']
})
export class InformacoesDetalhadasComponent implements OnInit {


  @Input() area;

  public total;

  constructor() { }

  ngOnInit(): void {

    // this.total = this.area?.custo?.map( item => item.total)
    //   .reduce( (curr, prev) => curr + prev, 0 )

    // console.log('total', this.total)

  }


  public getPercentual(valor){

    this.total = this.area?.custo?.categorias?.map( item => item.total)
      .reduce( (curr, prev) => curr + prev, 0 )

    return ((valor / this.total) * 100).toFixed(2)

  }

}
