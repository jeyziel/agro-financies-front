import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductiveAreasService {

  private api;

  constructor(private http: HttpClient) {
    this.api = environment.api_url;
  }

  create(params) {
    return this.http.post<any>(`${this.api}/areas-produtivas`, params);
  }


  edit(id: Number, params) {
    return this.http.put<any>(`${this.api}/areas-produtivas/${id}`, params);
  }

  delete(id: Number) {
    return this.http.delete<any>(`${this.api}/areas-produtivas/${id}`);
  }

  all() {
    return this.http.get<any>(`${this.api}/areas-produtivas`);
  }

  find(id: Number) {
    return this.http.get<any>(`${this.api}/areas-produtivas/${id}`);
  }

  units(){
    return this.http.get<any>(`${this.api}/areas-unidades`);
  }
}
