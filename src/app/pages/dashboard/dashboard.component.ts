import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
import { ProductiveAreasService } from 'src/app/services/productive-areas.service';
import { SafrasService } from 'src/app/services/safras.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;


  public safras;
  public areas;

  public dashboardFilterForm: FormGroup;
  public enabledGeral: Boolean = true;
  public filters: any;
  public loading: Boolean = false;


  constructor(
    private safraService : SafrasService,
    private areasProdutivasService: ProductiveAreasService,
    private toastr: ToastrService
   ){

    this.dashboardFilterForm = new FormGroup({
      safra_id: new FormControl(0, [Validators.min(0)]),
      productive_area_id: new FormControl(0, [Validators.min(0)])
    })

   }

   ngOnInit() {


     this.getSafras()
     this.getAreasProdutivas();

   


  }


  async getSafras(){

    await  this.safraService.all()
      .subscribe(safras => {
        this.safras = safras

        this.filters = {
          'safra_id' : this.safras[0]?.id
        }

        this.loading = true

      },
      err => {
        this.toastr.error("Falha ao buscar safras", 'Safras');
      }
    )

  }

  async getAreasProdutivas(){


     await this.areasProdutivasService.all()
      .subscribe(areas => {
        this.areas = areas
      },
      err => {
        this.toastr.error('Falha ao buscar Areas Produtivas. Tente Novamente!', 'ERRO')
      })

  }

  enabledDashboard(){

   this.filters = this.dashboardFilterForm.value

   if (this.filters?.productive_area_id == 0){
    this.enabledGeral = true;
    return;
   }

   
   this.enabledGeral = false;

  }

  


}
