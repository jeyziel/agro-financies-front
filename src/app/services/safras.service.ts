import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Inventory} from '../interfaces/inventory';
import {environment} from '../../environments/environment';
import {Observable, retry} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SafrasService {

  private api;

  constructor(private http: HttpClient) {
    this.api = environment.api_url;
  }

  create(params) {
    return this.http.post<any>(`${this.api}/safras`, params);
  }

  all() {
    return this.http.get<any>(`${this.api}/safras`);
  }

  edit(id: Number, params) {
    return this.http.put<any>(`${this.api}/safras/${id}`, params);
  }

  delete(id: Number) {
    return this.http.delete<any>(`${this.api}/safras/${id}`);
  }

  find(id: Number) {
    return this.http.get<any>(`${this.api}/safras/${id}`);
  }
}
