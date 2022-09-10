import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private api;

  constructor(private http: HttpClient) {
    this.api = environment.api_url;
  }

  create(params) {
    return this.http.post<any>(`${this.api}/employee`, params);
  }

  edit(id: Number, params) {
    return this.http.get<any>(`${this.api}/employee/${id}`, params);
  }

  delete(id: Number) {
    return this.http.delete<any>(`${this.api}/employee/${id}`);
  }

  all() {
    return this.http.get<any>(`${this.api}/employee`);
  }

  find(id: Number) {
    return this.http.get<any>(`${this.api}/employees/${id}`);
  }


}
