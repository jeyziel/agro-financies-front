import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custo-area',
  templateUrl: './custo-area.component.html',
  styleUrls: ['./custo-area.component.scss']
})
export class CustoAreaComponent implements OnInit {


  @Input() areas;


  constructor() { }

  ngOnInit(): void {
  }

}
