import { Component, OnInit, Input } from '@angular/core';
import { ConsumptionService } from 'src/app/services/consumption.service';

@Component({
  selector: 'app-consumo-categoria',
  templateUrl: './consumo-categoria.component.html',
  styleUrls: ['./consumo-categoria.component.scss']
})
export class ConsumoCategoriaComponent implements OnInit {


  @Input() category;

  constructor(
    private comsuptionService: ConsumptionService
  ) { }

  
  ngOnInit(): void {
  }

  

}
