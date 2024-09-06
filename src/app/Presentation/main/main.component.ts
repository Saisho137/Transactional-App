import { Component } from '@angular/core';
import { GetAccountUseCases } from 'src/app/domain/usecases/account/get-account.usecases';
import { Account } from 'src/app/domain/models/account/account.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  response$!: Observable<Account | null>;

  constructor(private _getAccountUseCases: GetAccountUseCases) {}

  ngOnInit(): void {
    this.response$ = this._getAccountUseCases.getAccountById('1');
  }
}
