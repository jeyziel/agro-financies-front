import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypesService {

  private api;

  constructor(private http: HttpClient) {
    this.api = environment.api_url;
  }

  all() {
    return this.http.get<any>(`${this.api}/payment-types`);
  }

  find(id: Number) {
    return this.http.get<any>(`${this.api}/payment-types/${id}`);
  }
}
