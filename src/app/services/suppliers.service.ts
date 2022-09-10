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
    return this.http.get<any>(`${this.api}/suppliers`, params);
  }

  edit(id: Number, params) {
    return this.http.get<any>(`${this.api}/suppliers`, params);
  }

  all() {
    return this.http.get<any>(`${this.api}/suppliers`);
  }

  find(id: Number) {
    return this.http.get<any>(`${this.api}/suppliers/${id}`);
  }
}
