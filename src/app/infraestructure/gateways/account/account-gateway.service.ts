// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { AccountGateway } from '@/app/domain/models/account/account.gateway';
import { Account } from '@/app/domain/models/account/account.model';
import { AccountEntity } from '@/app/infraestructure/entities/account-entity';
import { AccountMapperImplementation } from './account-gateway.mapper';
import { mapAccounts } from '@/app/infraestructure/helpers/transformers';

@Injectable({
  providedIn: 'root',
})
export class AccountGatewayService implements AccountGateway {
  // private apiUrl = 'https://api.example.com/accounts';
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

  private accountList$ = from([this.mockAccounts]);

  constructor(/* private _http: HttpClient */) {
    this.mapper = new AccountMapperImplementation();
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

  getAll(): Observable<Account[]> {
    return this.accountList$.pipe(
      delay(500),
      map((accountEntities) => mapAccounts(accountEntities, this.mapper))
    );
  }

  create(account: Account): Observable<Account> {
    throw new Error('Method not implemented');
  }

  update(id: string, updatedAccount: Partial<Account>): Observable<boolean> {
    throw new Error('Method not implemented');
  }

  delete(id: string): Observable<boolean> {
    throw new Error('Method not implemented');
  }

  getBalance(id: string): Observable<number> {
    throw new Error('Method not implemented');
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
