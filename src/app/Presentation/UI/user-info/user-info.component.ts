import { Component, Input, SimpleChanges } from '@angular/core';
import { Account } from '@/app/domain/models/account/account.model';
import { AccountFacadeService } from '@/app/Presentation/shared/services/account-facade.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent {
  @Input() accountId: string = '';
  account$: Observable<Account | null> = of(null);

  constructor(private _accountFacade: AccountFacadeService) {}

  ngOnInit() {
    this.account$ = this._accountFacade.getAccountById('4');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['accountId'] && changes['accountId'].currentValue) {
      this.loadAccount();
      console.log('Id: ', this.accountId);
    }
  }

  private loadAccount() {
    if (this.accountId)
      this.account$ = this._accountFacade.getAccountById(this.accountId);
  }
}
