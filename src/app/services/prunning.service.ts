
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PrunningService {

  private api;

  constructor(private http: HttpClient) {
    this.api = environment.api_url;
  }

  create(params){
    return this.http.post<any>(`${environment.api_url}/prunnings`, params);
  }



}
