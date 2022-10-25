import { Component, OnInit, Input } from '@angular/core';
import { InformacoesGerais } from 'src/app/interfaces/dashboard/informacoes-gerais';

@Component({
  selector: 'app-informacoes-gerais',
  templateUrl: './informacoes-gerais.component.html',
  styleUrls: ['./informacoes-gerais.component.scss']
})
export class InformacoesGeraisComponent implements OnInit {

  @Input() informacoes : InformacoesGerais;

  


  constructor() { }

  ngOnInit(): void {
  }

}
