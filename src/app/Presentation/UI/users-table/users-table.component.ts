import { Component } from '@angular/core';
import { Account } from '@/app/domain/models/account/account.model';
import { AccountFacadeService } from '@/app/Presentation/shared/services/account-facade.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent {
  accountList$!: Observable<Account[]>;
  selectedAccount: Account = {
    id: '',
    name: '',
    balance: 0,
    address: '',
  };
  accountIdSearch: string = ''

  constructor(private _accountFacade: AccountFacadeService) {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountList$ = this._accountFacade.getAllAccounts();
  }

  createAccount(account: Account) {
    this._accountFacade.createAccount(account).subscribe(() => {
      this.loadAccounts();
    });
    this.clearSelection();
  }

  updateAccount(id: string, updatedAccount: Partial<Account>) {
    this._accountFacade.updateAccount(id, updatedAccount).subscribe(() => {
      this.loadAccounts();
    });
    this.clearSelection();
  }

  deleteAccount(id: string) {
    this._accountFacade.deleteAccount(id).subscribe(() => {
      this.loadAccounts();
    });
  }

  selectAccount(account: Account) {
    this.selectedAccount = account;
  }

  clearSelection() {
    this.selectedAccount = {
      id: '',
      name: '',
      balance: 0,
      address: '',
    };
  }
}
