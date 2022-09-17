import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsumptionService {

  private api;

  constructor(private http: HttpClient) {
    this.api = environment.api_url;
  }

  public all(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/consumption`);
  }

  public create(params): Observable<any[]> {
    return this.http.post<any[]>(`${this.api}/consumption`, params);
  }


}
