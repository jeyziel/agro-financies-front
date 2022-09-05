import { Injectable } from '@angular/core';

import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';



@Injectable()
export class Interceptor implements HttpInterceptor {


    constructor(private authService : AuthService){

    }



    intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {

        console.log('entrei no interceptor')

        const token = this.authService.get('token')

        request = request.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token
            }
        });

        return next.handle(request);

    }

}
