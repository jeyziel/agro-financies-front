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

  all() {
    return this.http.get<any>(`${this.api}/providers`);
  }

  find(id: Number) {
    return this.http.get<any>(`${this.api}/providers/${id}`);
  }

}
