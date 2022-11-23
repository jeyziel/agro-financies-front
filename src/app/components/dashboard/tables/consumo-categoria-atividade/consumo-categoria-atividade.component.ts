import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-consumo-categoria-atividade',
  templateUrl: './consumo-categoria-atividade.component.html',
  styleUrls: ['./consumo-categoria-atividade.component.scss']
})
export class ConsumoCategoriaAtividadeComponent implements OnInit {


  @Input() category;

  constructor() { }

  ngOnInit(): void {
  }

}
