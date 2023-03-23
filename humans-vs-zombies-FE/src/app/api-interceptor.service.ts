import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import keycloak from 'src/keycloak';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = keycloak.idTokenParsed;

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ` + token
      }
    });

    return next.handle(request);
  }
}
