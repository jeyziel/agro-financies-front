import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AreasProdutivasComponent } from 'src/app/pages/areas-produtivas/areas-produtivas.component';
import { AtividadesComponent } from 'src/app/pages/atividades/atividades.component';
import { CategoriasComponent } from 'src/app/pages/atividades/categorias/categorias.component';
import { ProdutosComponent } from 'src/app/pages/produtos/produtos.component';
import { CategoriasProdutosComponent } from 'src/app/pages/produtos/categorias-produtos/categorias-produtos.component';
import { VendedoresComponent } from 'src/app/pages/fornecedores/vendedores/vendedores.component';
import { FornecedoresComponent } from 'src/app/pages/fornecedores/fornecedores.component';
import { FuncionariosComponent } from 'src/app/pages/funcionarios/funcionarios.component';
import { InventoriosComponent } from 'src/app/pages/inventorios/inventorios.component';
import { DetailsComponent } from 'src/app/pages/inventorios/details/details.component';
import { ConsumosComponent } from 'src/app/pages/consumos/consumos.component';
import { SafrasComponent } from 'src/app/pages/safras/safras.component';
import { VendasComponent } from 'src/app/pages/vendas/vendas.component';

export const AdminLayoutRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'safras',
        component: SafrasComponent

    },
    {
        path: 'areas-produtivas',
        component: AreasProdutivasComponent
    },
    {
        path: 'atividades',
        children: [
            {
                path: '',
                component: AtividadesComponent,
            },
            {
                path: 'categorias',
                component: CategoriasComponent
            }
        ]
    },
    {
        path: 'produtos',
        children: [
            {
                path: '',
                component: ProdutosComponent
            },
            {
                path: 'categorias',
                component: CategoriasProdutosComponent
            }

        ]

    },
    {
        path: 'fornecedores',
        children: [
            {
                path: '',
                component: FornecedoresComponent
            },
            {
                path: ':id/vendedores',
                component: VendedoresComponent,
                pathMatch: 'full'
            }
        ]

    },
    {
        path: 'funcionarios',
        component: FuncionariosComponent
    },
    {
        path: 'inventorio',
        children: [
            {
                path: '',
                component: InventoriosComponent
            },
            {
                path: ':id',
                component: DetailsComponent

            }
        ]

    },
    {
        path: 'consumos',
        children: [
            {
                path: '',
                component: ConsumosComponent
            },
        ]

    },
    {
        path: 'vendas',
        children: [
            {
                path: '',
                component: VendasComponent
            },
        ]

    },
    {
        path: 'user-profile',
        component: UserProfileComponent
    },
    {
        path: 'tables',
        component: TablesComponent
    },
    {
        path: 'icons',
        component: IconsComponent
    },
    {
        path: 'maps',
        component: MapsComponent
    }
];
