import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '@/app/domain/models/account/account.model';
import { GetAccountUseCases } from '@/app/domain/usecases/account/crud-account.usecases';
import { GetBalanceUseCase } from '@/app/domain/usecases/account/get-balance.usecase';

@Injectable({
  providedIn: 'root',
})
export class AccountFacade {
  constructor(
    private _getAccountUseCases: GetAccountUseCases,
    private _getBalanceUseCase: GetBalanceUseCase
  ) {}

  getAccountById(id: string): Observable<Account | null> {
    return this._getAccountUseCases.getAccountById(id);
  }

  getAllAccount(): Observable<Account[]> {
    return this._getAccountUseCases.getAllAccount();
  }

  create(account: Account): Observable<Account> {
    return this._getAccountUseCases.createAccount(account);
  }

  update(id: string, updatedAccount: Partial<Account>): Observable<boolean> {
    return this._getAccountUseCases.updateAccount(id, updatedAccount);
  }

  delete(id: string): Observable<boolean> {
    return this._getAccountUseCases.deleteAccount(id);
  }

  getBalance(id: string): Observable<number> {
    return this._getBalanceUseCase.execute(id);
  }
}
