import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private  api: String;

  constructor(private http: HttpClient) {
      this.api = environment.api_url;
  }

  public create(product){
    return this.http.post<any>(`${this.api}/tasks`, product)
      .pipe(retry(1));
  }

  public edit(id: Number, product){
    return this.http.put<any>(`${this.api}/tasks/${id}`, product)
      .pipe(retry(1));

  }

  public all(){
    return this.http.get<any>(`${this.api}/tasks/`)
      .pipe(retry(1));
  }

  public find(id: Number){
    return this.http.get<any>(`${this.api}/tasks/${id}`)
      .pipe(retry(1));
  }

  public delete(id: Number){
    return this.http.delete<any>(`${this.api}/tasks/${id}`)
      .pipe(retry(1));
  }

  public listCategories(){
    return this.http.get<any>(`${this.api}/task-category`)
      .pipe(retry(1));
  }

  public addCategories(category){
    return this.http.post<any>(`${this.api}/task-category`, category)
      .pipe(retry(1));
  }

  public editCategory(id: Number, categorie){
    return this.http.put<any>(`${this.api}/task-category/${id}`, categorie)
      .pipe(retry(1));
  }

  public findCategory(id: Number){
    return this.http.get<any>(`${this.api}/task-category`)
      .pipe(retry(1));
  }

  public deleteCategory(id: Number){
    return this.http.delete<any>(`${this.api}/product-category/${id}`)
      .pipe(retry(1));
  }

}
