import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private api;

  constructor(private http: HttpClient) {
    this.api = environment.api_url;
  }

  create(params) {
    return this.http.post<any>(`${this.api}/sales`, params);
  }

  edit(id: Number, params) {
    return this.http.put<any>(`${this.api}/sales/${id}`, params);
  }

  delete(id: Number) {
    return this.http.delete<any>(`${this.api}/sales/${id}`);
  }

  all() {
    return this.http.get<any>(`${this.api}/sales`);
  }

  find(id: Number) {
    return this.http.get<any>(`${this.api}/sales/${id}`);
  }
}
