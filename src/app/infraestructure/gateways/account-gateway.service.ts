// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { AccountGateway } from '@/app/domain/models/account/account.gateway';
import { Account } from '@/app/domain/models/account/account.model';
import { AccountEntity } from '@/app/infraestructure/entities/account-entity';
import { AccountMapperImplementation } from '../mappers/account.mapper';
import { mapAccounts } from '@/app/infraestructure/helpers/transformers';

@Injectable({
  providedIn: 'root',
})
export class AccountGatewayService implements AccountGateway {
  private mapper: AccountMapperImplementation;
  private mockAccounts: AccountEntity[] = [
    {
      key: '1',
      accountName: 'John Doe',
      amount: 1000,
      direction: '123 Main St',
    },
    {
      key: '2',
      accountName: 'Jane Smith',
      amount: 2000,
      direction: '456 Elm St',
    },
    {
      key: '3',
      accountName: 'Bob Johnson',
      amount: 3000,
      direction: '789 Oak St',
    },
  ];

  constructor() {
    this.mapper = new AccountMapperImplementation();
  }

  create(account: Account): Observable<Account> {
    const newAccountEntity: AccountEntity = this.mapper.mapTo(account);

    newAccountEntity.key = (this.mockAccounts.length + 1).toString();
    this.mockAccounts.push(newAccountEntity);

    return of(this.mapper.mapFrom(newAccountEntity)).pipe(delay(300));
  }

  getAll(): Observable<Account[]> {
    const accountList$ = from([this.mockAccounts]);

    return accountList$.pipe(
      delay(500),
      map((accountEntities) => mapAccounts(accountEntities, this.mapper))
    );
  }

  getById(id: string): Observable<Account | null> {
    const accountEntity = this.mockAccounts.find(
      (account) => account.key === id
    );

    if (accountEntity)
      return of(accountEntity).pipe(
        delay(300),
        map((account) => (account ? this.mapper.mapFrom(account) : null))
      );

    return of(null).pipe(delay(300));
  }

  getBalance(id: string): Observable<number> {
    const accountEntity = this.mockAccounts.find(
      (account) => account.key === id
    );

    if (accountEntity) {
      const account = this.mapper.mapFrom(accountEntity);
      return of(account.balance).pipe(delay(300));
    }

    return of(0).pipe(delay(300));
  }

  update(id: string, updatedAccount: Partial<Account>): Observable<boolean> {
    const accountIndex = this.mockAccounts.findIndex(
      (account) => account.key === id
    );

    if (accountIndex > -1) {
      const existingAccount = this.mapper.mapFrom(
        this.mockAccounts[accountIndex]
      );
      const updatedAccountEntity = this.mapper.mapTo({
        ...existingAccount,
        ...updatedAccount,
      });

      this.mockAccounts[accountIndex] = updatedAccountEntity;

      return of(true).pipe(delay(300));
    }

    return of(false).pipe(delay(300));
  }

  delete(id: string): Observable<boolean> {
    const accountIndex = this.mockAccounts.findIndex(
      (account) => account.key === id
    );

    if (accountIndex > -1) {
      this.mockAccounts.splice(accountIndex, 1);
      return of(true).pipe(delay(300));
    }

    return of(false).pipe(delay(300));
  }
}

/*
### HTTP EXAMPLE:
getById(id: string): Observable<Account> {
  return this._http
    .get<AccountEntity>(`${this.apiUrl}/${id}`)
    .pipe(map((accountEntity) => this.mapper.mapFrom(accountEntity)));
}

getAll(): Observable<Account[]> {
  return this._http
    .get<AccountEntity[]>(this.apiUrl)
    .pipe(
      map((accountEntities) =>
        accountEntities.map((entity) => this.mapper.mapFrom(entity))
      )
    );
}
*/
