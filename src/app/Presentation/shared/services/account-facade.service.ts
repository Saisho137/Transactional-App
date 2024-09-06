import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'src/app/domain/models/account/account.model';
import { GetAccountUseCases } from 'src/app/domain/usecases/account/get-account.usecases';

@Injectable({
  providedIn: 'root',
})
export class AccountFacade {
  constructor(private _getAccountUseCases: GetAccountUseCases) {}

  getAccountById(id: string) {
    return this._getAccountUseCases.getAccountById(id);
  }

  getAllAccount() {
    return this._getAccountUseCases.getAllAccount();
  }
}
