import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { AccountGatewayService } from 'src/app/infraestructure/gateways/account/account-gateway.service';
import { AccountGateway } from 'src/app/domain/models/account/account.gateway';
import { GetAccountUseCases } from 'src/app/domain/usecases/account/get-account.usecases';

const routes: Routes = [{ path: '', component: MainComponent }];

@NgModule({
  declarations: [MainComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
  providers: [
    GetAccountUseCases,
    { provide: AccountGateway, useClass: AccountGatewayService },
  ],
  exports: [MainComponent],
})
export class MainModule {}
