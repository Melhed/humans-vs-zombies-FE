import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../consts/storage-keys.enum';
import { User } from '../models/user.model';
import { StorageUtil } from '../utils/storage.util';

const { APIUsers, APIKey } = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly http: HttpClient) { }

  //Login
  public login(username: number): Observable<User> {
    return this.checkUsername(username)
    .pipe(
      switchMap((user: User | undefined ) => {
        if(user === undefined) {
          return this.createUser(username);
        }
        return of(user);
      }),
      tap((user: User) => {
        StorageUtil.storageSave<User>(StorageKeys.User, user);
      })
    )
  }

  //Check if user exists
  private checkUsername(username: number): Observable<User | undefined> {
    return this.http.get<User[]>(`${APIUsers}/${username}`)
    .pipe(
      map((response: User[]) => response.pop())
    )
  }

  //Create user
  private createUser(first_name: number): Observable<User> {
    const user = {
      first_name
    };

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      //"x-api-key": APIKey,
    });
    return this.http.post<User>(APIUsers, user, {headers});
  }
}