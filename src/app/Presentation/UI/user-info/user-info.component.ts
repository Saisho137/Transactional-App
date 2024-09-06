import { Component } from '@angular/core';
import { Account } from 'src/app/domain/models/account/account.model';
import { AccountFacade } from '../../shared/services/account-facade.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent {
  account!: Account | null;

  constructor(private _accountFacade: AccountFacade) {
    this._accountFacade
      .getAccountById('1')
      .subscribe((value) => (this.account = value));
  }
}
