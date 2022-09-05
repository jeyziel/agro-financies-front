import { Component, OnInit } from '@angular/core';
import {ChartOptions} from 'chart.js';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss']
})
export class BarcodeComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels  = ['JAN/22', 'FEV/22', 'MAR/22', 'ABR/22', 'MAI/22', 'JUN/22', 'JUL/22'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', stack: 'a' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B', stack: 'a' }
  ];

  ngOnInit() {}

}
