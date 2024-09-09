import { Component } from '@angular/core';
import { Account } from '@/app/domain/models/account/account.model';
import { AccountFacade } from '@/app/Presentation/shared/services/account-facade.service';

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
