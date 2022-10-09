import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AreasProdutivasComponent } from './pages/areas-produtivas/areas-produtivas.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { FornecedoresComponent } from './pages/fornecedores/fornecedores.component';
import { FuncionariosComponent } from './pages/funcionarios/funcionarios.component';
import { InventoriosComponent } from './pages/inventorios/inventorios.component';
import { ConsumosComponent } from './pages/consumos/consumos.component';
import { AtividadesComponent } from './pages/atividades/atividades.component';
import { CategoriasComponent } from './pages/atividades/categorias/categorias.component';
import { CategoriasProdutosComponent } from './pages/produtos/categorias-produtos/categorias-produtos.component';
import { VendedoresComponent } from './pages/fornecedores/vendedores/vendedores.component';
import { DetailsComponent } from './pages/inventorios/details/details.component';
import {NgChartsModule} from 'ng2-charts';
import { SafrasComponent } from './pages/safras/safras.component';
import {Interceptor} from './interceptors/interceptor.service';
import {InterceptorModule} from './interceptors/interceptor.module';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { VendasComponent } from './pages/vendas/vendas.component';
import { IndividualComponent } from './pages/dashboard/individual/individual.component';
import { GeralComponent } from './pages/dashboard/geral/geral.component';


registerLocaleData(localePt);





@NgModule({
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    InterceptorModule,
    NgChartsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    AreasProdutivasComponent,
    ProdutosComponent,
    FornecedoresComponent,
    FuncionariosComponent,
    InventoriosComponent,
    ConsumosComponent,
    AtividadesComponent,
    CategoriasComponent,
    CategoriasProdutosComponent,
    VendedoresComponent,
    DetailsComponent,
    SafrasComponent,
    VendasComponent,
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    {provide: LOCALE_ID, useValue: 'pt-BR'}


    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
