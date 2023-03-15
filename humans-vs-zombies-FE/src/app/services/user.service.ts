import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { StorageKeys } from '../consts/storage-keys.enum';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { StorageUtil } from '../utils/storage.util';

const { APIUsers, APIKey } = environment;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user?: User; //? is the same as "| undefined"

  public get user(): User | undefined {
    return this._user;
  }
  public set user(user: User | undefined) {
    StorageUtil.storageSave<User>(StorageKeys.User, user!); //! = "Will never be undefined"
    this._user = user;
  }



  public handleUserLogin(user: User): Observable<User> {
    return this.checkUser(user.id).pipe(
      switchMap((userRes: User | undefined) => {
        console.log(userRes);
        
        if(userRes === undefined) {
          console.log(user)
          return this.createUser(user);
        }
        console.log(userRes);
        return of(userRes);
      })
    )
  }

  public createUser(user: User): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<User>(APIUsers, user, {headers});
  }

  public checkUser(userId: string): Observable<User | undefined> {
    console.log("asjaskas")
    return this.http.get<User[]>(`${APIUsers}/${userId}`)
    .pipe(map((res: User[]) => res.pop()));
  }


  constructor(private readonly http: HttpClient) {
    this._user = StorageUtil.storageRead<User>(StorageKeys.User);
  }
}
