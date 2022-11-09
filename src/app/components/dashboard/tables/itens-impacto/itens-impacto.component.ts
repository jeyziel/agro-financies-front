import { Component, OnInit, Input } from '@angular/core';
import { CustoItem } from 'src/app/interfaces/dashboard/custo-itens';

@Component({
  selector: 'app-itens-impacto',
  templateUrl: './itens-impacto.component.html',
  styleUrls: ['./itens-impacto.component.scss']
})
export class ItensImpactoComponent implements OnInit {

  @Input() itens : CustoItem[]


  constructor() { }

  ngOnInit(): void {

    console.log('itens impacto', this.itens)

  }

}
