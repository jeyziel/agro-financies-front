import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
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


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    NgChartsModule
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
    DetailsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
