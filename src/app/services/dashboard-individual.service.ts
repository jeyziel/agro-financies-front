import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardIndividualService {

  private api;

  constructor(private http: HttpClient) {
    this.api = environment.api_url;
  }

  public infoArea(id: Number, params){
    return this.http.get<any>(`${environment.api_url}/report/area-produtiva/${id}/info`, {params});
  }

  public custosCategoria(id: Number, params){
    return this.http.get<any>(`${environment.api_url}/report/area-produtiva/${id}/custos-categorias`, {params});
  }

  public custosItens(id: Number, params){
    return this.http.get<any>(`${environment.api_url}/report/area-produtiva/${id}/custos-itens`, {params});
  }

  public custosMensais(id: Number, params){
    return this.http.get<any>(`${environment.api_url}/report/area-produtiva/${id}/custos-mensais`, {params});
  }

  public vendas(id: Number, params){
    return this.http.get<any>(`${environment.api_url}/report/area-produtiva/${id}/vendas`, {params});
  }

  



}
