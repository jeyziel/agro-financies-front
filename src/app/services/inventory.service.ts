import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Inventory} from '../interfaces/inventory';
import {environment} from '../../environments/environment';
import {Observable, retry} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private  api: String;

  constructor(private http: HttpClient) {
      this.api = environment.api_url;
  }

   public create(inventory: Inventory) {
     return this.http.post<Inventory>(`${this.api}/inventory`, inventory)
       .pipe(retry(1));

   }

   public update(id: Number, inventory: Inventory) {
      return this.http.put<Inventory>(`${this.api}/inventory/${id}`, inventory)
        .pipe(retry(1));

    }

    public delete(id: Number) {
      return this.http.delete<Inventory>(`${this.api}/inventory/${id}`)
        .pipe(retry(1));

    }

   public all(): Observable<Inventory[]> {
      return this.http.get<Inventory[]>(`${this.api}/inventory`);
   }

   public find(id: Number): Observable<Inventory> {
      return this.http.get<Inventory>(`${this.api}/inventory/${id}`);
   }

   public details(id: Number){
      return this.http.get<any[]>(`${this.api}/inventory/${id}/list-products`);
   }

   public addProduct(id: Number, params){
      return this.http.post<any>(`${this.api}/inventory/${id}/product`, params);
   }

   public listProducts(id: Number){
    return this.http.get<any>(`${this.api}/inventory/${id}/list-products`);
 }

   public editProduct(id: Number, params){
      return this.http.put<any>(`${this.api}/inventory/${id}/product`, {params});
   }

   public deleteProduct(id: Number){
      return this.http.delete<any>(`${this.api}/inventory/${id}/product`);
   }
 

}
