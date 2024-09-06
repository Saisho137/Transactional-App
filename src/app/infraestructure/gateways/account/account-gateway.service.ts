import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { AccountGateway } from 'src/app/domain/models/account/account.gateway';
import { Account } from 'src/app/domain/models/account/account.model';
import { AccountEntity } from './account-entity';
import { AccountMapperImplementation } from './account-gateway.mapper';

@Injectable({
  providedIn: 'root',
})
export class AccountGatewayService extends AccountGateway {
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

  constructor(/* private _http: HttpClient */) {
    super();
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
    return of(this.mockAccounts).pipe(
      delay(500),
      map((accountEntities) =>
        accountEntities.map((entity) => this.mapper.mapFrom(entity))
      )
    );
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
}
