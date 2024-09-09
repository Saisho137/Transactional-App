import { Component, Input, SimpleChanges } from '@angular/core';
import { Account } from '@/app/domain/models/account/account.model';
import { AccountFacadeService } from '@/app/Presentation/shared/services/account-facade.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent {
  @Input() accountId: string = '';
  account!: Account | null;

  constructor(private _accountFacade: AccountFacadeService) {}

  ngOnInit() {
    this.loadAccount();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['accountId'] && changes['accountId'].currentValue) {
      this.loadAccount();
      console.log('Id: ', this.accountId);
    }
  }

  private loadAccount() {
    if (this.accountId)
      this._accountFacade.getAccountById(this.accountId).subscribe((value) => {
        this.account = value;
      });
  }
}
