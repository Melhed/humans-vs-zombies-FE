import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import keycloak from "src/keycloak";

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {

    /**
     * Automatically add the Auth Token to the Request Headers.
     * @param req request object before sending
     * @param next forward to Http Request
     * @returns HttpEvent
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Not authenticated. Send request as is.
        if (!keycloak.authenticated || !keycloak.token) {
            return next.handle(req);
        }

        const { token } = keycloak;

        const authRequest = req.clone({
            headers: req.headers.set("Authorization", `Bearer ${token}`),
        });

        return next.handle(authRequest);
    }

}
