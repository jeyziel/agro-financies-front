import { Component, OnInit, Input } from '@angular/core';
import { DashboardGeralService } from 'src/app/services/dashboard-geral.service';

@Component({
  selector: 'app-geral',
  templateUrl: './geral.component.html',
  styleUrls: ['./geral.component.scss']
})
export class GeralComponent implements OnInit {

  @Input() filters;

  constructor(private geralService : DashboardGeralService ) { }

  ngOnInit(): void {

    console.log('filters geral', this.filters)

  }

}
