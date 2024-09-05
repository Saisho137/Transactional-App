import { Observable } from 'rxjs';
import { Account } from '../../models/Account/account.model';
import { AccountGateway } from '../../models/Account/account.gateway';

export class GetAccountUseCases {
  constructor(private _accountGateway: AccountGateway) {}

  getAccountById(accountId: string): Observable<Account> {
    return this._accountGateway.getById(accountId);
  }

  getAllAccount(): Observable<Account[]> {
    return this._accountGateway.getAll();
  }
}
