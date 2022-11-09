import { Component, Input, OnInit } from '@angular/core';
import {ChartOptions} from 'chart.js';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss']
})
export class BarcodeComponent implements OnInit {

  @Input() labels;
  @Input() data;

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels  = ['JAN/22', 'FEV/22', 'MAR/22', 'ABR/22', 'MAI/22', 'JUN/22', 'JUL/22'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData = [
    //{ data: []},
    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B', stack: 'a' }
  ];

  ngOnInit() {

    console.log(this.labels)
    console.log(this.data)

    this.barChartLabels = this.labels
    this.barChartData.push({
      data: this.data,
      label: 'Meses'
    }) 



  }

}
