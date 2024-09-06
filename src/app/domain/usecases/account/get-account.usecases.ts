import { Observable } from 'rxjs';
import { Account } from '../../models/account/account.model';
import { AccountGateway } from '../../models/account/account.gateway';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetAccountUseCases {
  constructor(private _accountGateway: AccountGateway) {}

  getAccountById(accountId: string): Observable<Account | null> {
    return this._accountGateway.getById(accountId);
  }

  getAllAccount(): Observable<Account[]> {
    return this._accountGateway.getAll();
  }
}
