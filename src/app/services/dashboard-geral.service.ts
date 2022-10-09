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
    this.http.get<any>(`${environment.api_url}/info-area`, {params});
  }

  public custosCategoria(params){
    this.http.get<any>(`${environment.api_url}/custos-categorias`, {params});
  }

  public custosItens(params){
    this.http.get<any>(`${environment.api_url}/custos-itens`, {params});
  }

  public custosMensais(params){
    this.http.get<any>(`${environment.api_url}/custos-mensais`, {params});
  }

  public vendas(params){
    this.http.get<any>(`${environment.api_url}/vendas`, {params});
  }



}
