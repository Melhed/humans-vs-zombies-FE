import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

const { APIUsers, APIKey } = environment;


@Injectable({
  providedIn: 'root'
})
export class LoginService {



  constructor(private readonly http: HttpClient) { }

  //Login
  public login(username: string): Observable<User> {
    return this.checkUsername(username)
    .pipe(
      switchMap((user: User | undefined ) => {
        if(user === undefined) {
          console.log("User undefined, creating user");
          return this.createUser(username);
        }
        console.log("User found");
        return of(user);
      })
    )
  }

  //Check if user exists
  private checkUsername(username: string): Observable<User | undefined> {
    console.log("Checking user id...");
    return this.http.get<User>(`${APIUsers}/${username}`)
    .pipe(
      map((response: User) => response)
    )
  }

  //Create user
  private createUser(id: string): Observable<User> {
    const user = {
      id
    };

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-api-key": APIKey,
    });
    return this.http.post<User>(APIUsers, user, {
      headers
    })
  }
}

