import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  public login(credentials) {

    return this.http.post(`${environment.api_url}/auth/login`, credentials);

  }

  public logout(credencials) {
    return this.http.post(`${environment.api_url}/logout`, {credencials});
  }

  public add(data) {
    
    
    localStorage.setItem('user', JSON.stringify(data.user))
    localStorage.setItem('token', data.access_token)

  }

  public get(key) {

    return localStorage.getItem(key)
  }

  public remove(){
    localStorage.clear();
  }






}
