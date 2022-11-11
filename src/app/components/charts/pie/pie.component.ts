import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';


@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {


  @Input() data;
  @Input() labels;


 

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [ {
      data: []
    } ]
  };

  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [  ];


 

  ngOnInit() {

    console.log(this.labels)
    console.log(this?.data)


    this.pieChartData.labels = this.labels
    this.pieChartData.datasets = [{
      data: this.data
    }]


  }




}
