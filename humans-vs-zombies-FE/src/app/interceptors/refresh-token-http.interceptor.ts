import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, Observable, switchMap } from "rxjs";
import keycloak from "src/keycloak";

@Injectable()
export class RefreshTokenHttpInterceptor implements HttpInterceptor {

    /**
     * Automatically add the Auth Token to the Request Headers.
     * @param req request object before sending
     * @param next forward to Http Request
     * @returns HttpEvent
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!keycloak.authenticated || keycloak.isTokenExpired() === false) {
            return next.handle(req);
        }

        const HOUR_IN_SECONDS = 3600;

        return from(keycloak.updateToken(HOUR_IN_SECONDS)).pipe(
            switchMap(() => {
                return next.handle(req);
            })
        );
    }

}
