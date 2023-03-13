import { Injectable } from '@angular/core';
import { StorageKeys } from '../consts/storage-keys.enum';
import { User } from '../models/user.model';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
  providedIn: 'root'
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

  constructor() {
    this._user = StorageUtil.storageRead<User>(StorageKeys.User);
  }
}
