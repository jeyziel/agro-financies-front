import { Component, OnInit } from '@angular/core';
import { ConsumptionService } from 'src/app/services/consumption.service';

@Component({
  selector: 'app-consumo-categoria',
  templateUrl: './consumo-categoria.component.html',
  styleUrls: ['./consumo-categoria.component.scss']
})
export class ConsumoCategoriaComponent implements OnInit {

  constructor(
    private comsuptionService: ConsumptionService
  ) { }

  
  ngOnInit(): void {
  }

  

}
