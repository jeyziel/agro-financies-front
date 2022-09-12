import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Inventory} from '../interfaces/inventory';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  private api;

  constructor(private http: HttpClient) {
    this.api = environment.api_url;
  }

  create(params) {
    return this.http.post<any>(`${this.api}/providers`, params);
  }

  edit(id: Number, params) {
    return this.http.put<any>(`${this.api}/providers/${id}`, params);
  }

  delete(id: Number) {
    return this.http.delete<any>(`${this.api}/providers/${id}`);
  }

  all() {
    return this.http.get<any>(`${this.api}/providers`);
  }

  find(id: Number) {
    return this.http.get<any>(`${this.api}/providers/${id}`);
  }


}
