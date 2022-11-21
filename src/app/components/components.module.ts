import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ItensImpactoComponent } from './dashboard/tables/itens-impacto/itens-impacto.component';
import { CustoAreaComponent } from './dashboard/tables/custo-area/custo-area.component';
import { CustoCategoriasComponent } from './dashboard/tables/custo-categorias/custo-categorias.component';
import { InformacoesGeraisComponent } from './dashboard/tables/informacoes-gerais/informacoes-gerais.component';
import { InformacoesDetalhadasComponent } from './dashboard/tables/informacoes-detalhadas/informacoes-detalhadas.component';
import { BarcodeComponent } from './charts/barcode/barcode.component';
import { PieComponent } from './charts/pie/pie.component';
import { DoughnutComponent } from './charts/doughnut/doughnut.component';
import {NgChartsModule} from 'ng2-charts';
import { ConsumoCategoriaComponent } from './dashboard/tables/consumo-categoria/consumo-categoria.component';
import { ConsumosComponent } from '../pages/consumos/consumos.component';
import { ConsumoCategoriaAtividadeComponent } from './dashboard/tables/consumo-categoria-atividade/consumo-categoria-atividade.component';




@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    NgChartsModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ItensImpactoComponent,
    CustoAreaComponent,
    CustoCategoriasComponent,
    InformacoesGeraisComponent,
    InformacoesDetalhadasComponent,
    BarcodeComponent,
    PieComponent,
    DoughnutComponent,
    ConsumoCategoriaComponent,
    ConsumoCategoriaAtividadeComponent
  ],
    exports: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        ItensImpactoComponent,
        CustoAreaComponent,
        CustoCategoriasComponent,
        InformacoesGeraisComponent,
        InformacoesDetalhadasComponent,
        ConsumoCategoriaComponent,
        PieComponent,
        BarcodeComponent
    ]
})
export class ComponentsModule { }
