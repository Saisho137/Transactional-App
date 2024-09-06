import { Observable } from 'rxjs';
import { Account } from './account.model';

export abstract class AccountGateway {
  abstract getById(id: string): Observable<Account | null>;
  abstract getAll(): Observable<Account[]>;
}
