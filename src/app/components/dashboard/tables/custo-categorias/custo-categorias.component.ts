import { Component, OnInit, Input } from '@angular/core';
import { CustoCategoria } from 'src/app/interfaces/dashboard/custo-categorias';

@Component({
  selector: 'app-custo-categorias',
  templateUrl: './custo-categorias.component.html',
  styleUrls: ['./custo-categorias.component.scss']
})
export class CustoCategoriasComponent implements OnInit {

  @Input() custoCategorias : CustoCategoria

  constructor() { }

  ngOnInit(): void {

  }

}
