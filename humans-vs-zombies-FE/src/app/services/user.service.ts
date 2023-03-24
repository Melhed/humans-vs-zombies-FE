import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable } from 'rxjs';
import { StorageKeys } from '../consts/storage-keys.enum';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { StorageUtil } from '../utils/storage.util';

const { APIUsers } = environment;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user?: User; //? is the same as "| undefined"

  private _allUsers: User[] = [];
  private _loading: boolean = false;
  private _error: string = "";

  public get user(): User | undefined {
    return this._user;
  }
  public set user(user: User | undefined) {
    StorageUtil.storageSave<User>(StorageKeys.User, user!); //! = "Will never be undefined"
    this._user = user;
  }

  public handleUserLogin(user: User): any {

    this.checkUser(user.id).subscribe((fetchedUser) => {
      if (fetchedUser === undefined) {
        return this.createUser(user).subscribe(() => {
          StorageUtil.storageSave<User>(StorageKeys.User, user!);
        });
      }
      this.user = user;
      return user;
    });
  }

  public createUser(user: User): Observable<void | User> {
    return this.http
      .post<User>(APIUsers, user)
      .pipe(catchError(async (err) => console.log(err)));
  }

  public checkUser(userId: string): Observable<any> {
    return this.http
      .get<User>(`${APIUsers}/${userId}`)
      .pipe(catchError(async (err) => console.log(err)));
  }

  constructor(private readonly http: HttpClient) {
    this._user = StorageUtil.storageRead<User>(StorageKeys.User);
  }


  public findAllUsers(): void {
    this._loading = true;
    this.http.get<User[]>(APIUsers).pipe(
      finalize(()=> {
        this._loading = false;
      })
    )
    .subscribe({
      next: (users: User[]) => {
        this._allUsers = users;
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }

  public userById(id: any): User | undefined{
    return this._allUsers.find(user => user.id === id);
  }

  
}
