import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  private api;

  constructor(private http: HttpClient) {
    this.api = environment.api_url;
  }

  create(params){
    return this.http.post(`${environment.api_url}/metas`, params);
  }
}
