import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardGeralService {

  private api;

  constructor(private http: HttpClient) {
    this.api = environment.api_url;
  }

  public infoArea(params){
    return this.http.get<any>(`${environment.api_url}/report/area-produtiva/info`, {params});
  }

  public custosCategoria(params){
    return this.http.get<any>(`${environment.api_url}/report/area-produtiva/custos-categorias`, {params});
  }

  public custosItens(params){
    return this.http.get<any>(`${environment.api_url}/report/area-produtiva/custos-itens`, {params});
  }

  public custosMensais(params){
    return this.http.get<any>(`${environment.api_url}/report/area-produtiva/custos-mensais`, {params});
  }

  public vendas(params){
    return this.http.get<any>(`${environment.api_url}/report/area-produtiva/vendas`, {params});
  }



}
