import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '@/app/domain/models/account/account.model';
import { GetAccountUseCases } from '@/app/domain/usecases/account/get-account.usecases';

@Injectable({
  providedIn: 'root',
})
export class AccountFacade {
  constructor(private _getAccountUseCases: GetAccountUseCases) {}

  getAccountById(id: string): Observable<Account | null> {
    return this._getAccountUseCases.getAccountById(id);
  }

  getAllAccount(): Observable<Account[]> {
    return this._getAccountUseCases.getAllAccount();
  }
}
