import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import keycloak from 'src/keycloak';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'humans-vs-zombies-FE';

  constructor(
    public http: HttpClient) { }

  ngOnInit() {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${keycloak.idToken}`
      });

    const requestOptions = { headers: headers };

    this.http.get('http://localhost:8083/auth/realms/hvz/protocol/openid-connect/certs', requestOptions)
        .subscribe((res: any) => {
            console.log(res);
        });
  }
}
