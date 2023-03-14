import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public createUser(user: User): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': APIKey,
    });

    if (!this.checkUser(user.id)) {
      console.log('HEeREER');

      let res = this.http.post<User>(`${APIUsers}`, user, {
        headers,
      });
      console.log(res);
    }

    return of(user);
  }

  private checkUser(id: string): boolean {
    console.log('Checking user id...');
    // let userIsFound: boolean = false;
    let userId;
    this.http
      .get<User>(`${APIUsers}/${id}`)
      .pipe(map((user: User) => (userId = user.id)));
    console.log(userId);

    return userId === id;

    // let isTrue: boolean = false;
    // if (res === undefined) return false;
    // res.forEach((user) => {
    //   if (user.id === id) isTrue = true;
    // });
    // return isTrue;
  }

  constructor(private readonly http: HttpClient) {
    this._user = StorageUtil.storageRead<User>(StorageKeys.User);
  }
}
