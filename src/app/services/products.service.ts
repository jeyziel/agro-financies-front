import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private  api: String;

  constructor(private http: HttpClient) {
      this.api = environment.api_url;
  }

  public create(product){
    return this.http.post<any>(`${this.api}/products`, product)
      .pipe(retry(1));
  }

  public edit(id: Number, product){
    return this.http.put<any>(`${this.api}/products/${id}`, product)
      .pipe(retry(1));

  }

  public all(){
    return this.http.get<any>(`${this.api}/products/`)
      .pipe(retry(1));
  }

  public find(id: Number){
    return this.http.get<any>(`${this.api}/products/${id}`)
      .pipe(retry(1));
  }

  public delete(id: Number){
    return this.http.delete<any>(`${this.api}/products/${id}`)
      .pipe(retry(1));
  }

  public listCategories(){
    return this.http.get<any>(`${this.api}/product-category`)
      .pipe(retry(1));
  }

  public addCategories(category){
    return this.http.post<any>(`${this.api}/product-category`, category)
      .pipe(retry(1));
  }

  public editCategories(id: Number, categorie){
    return this.http.put<any>(`${this.api}/product-category/${id}`, categorie)
      .pipe(retry(1));
  }

  public findCategorie(id: Number){
    return this.http.get<any>(`${this.api}/product-category`)
      .pipe(retry(1));
  }

  public removeCategories(id: Number){
    return this.http.delete<any>(`${this.api}/product-category`)
      .pipe(retry(1));
  }

  public listUnits(){
    return this.http.get<any>(`${this.api}/product-unit`)
      .pipe(retry(1));
  }










}
