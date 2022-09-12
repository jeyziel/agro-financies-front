import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Inventory} from '../interfaces/inventory';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  private api;

  constructor(private http: HttpClient) {
    this.api = environment.api_url;
  }

  create(params) {
    return this.http.post<any>(`${this.api}/suppliers`, params);
  }

  delete(id: Number) {
    return this.http.delete<any>(`${this.api}/suppliers/${id}`);
  }


  edit(id: Number, params) {
    return this.http.put<any>(`${this.api}/suppliers/${id}`, params);
  }

  all(params) {
    return this.http.get<any>(`${this.api}/suppliers`, {params});
  }

  find(id: Number) {
    return this.http.get<any>(`${this.api}/suppliers/${id}`);
  }
}
