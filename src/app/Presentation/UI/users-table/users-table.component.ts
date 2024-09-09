import { Component } from '@angular/core';
import { Account } from '@/app/domain/models/account/account.model';
import { AccountFacade } from '@/app/Presentation/shared/services/account-facade.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent {
  accountList$!: Observable<Account[]>;

  constructor(private _accountFacade: AccountFacade) {}

  ngOnInit(): void {
    this.accountList$ = this._accountFacade.getAllAccount();
  }
}
