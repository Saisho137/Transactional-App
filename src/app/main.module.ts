import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { GetAccountUseCases } from './domain/usecases/account/get-account.usecases';
import { AccountGateway } from './domain/models/account/account.gateway';
import { AccountGatewayService } from './infraestructure/gateways/account/account-gateway.service';
import { MainComponent } from './Presentation/UI/main/main.component';
import { Routes, RouterModule } from '@angular/router';
import { UserInfoComponent } from './Presentation/UI/user-info/user-info.component';
import { UsersTableComponent } from './Presentation/UI/users-table/users-table.component';

const routes: Routes = [
  {
    path: 'user-info',
    component: UserInfoComponent,
    pathMatch: 'full',
    title: 'User Information',
  },
  {
    path: 'users-table',
    component: UsersTableComponent,
    pathMatch: 'full',
    title: 'User Information',
  },
  { path: '', redirectTo: '/user-info', pathMatch: 'prefix' },
];

@NgModule({
  declarations: [MainComponent, UserInfoComponent, UsersTableComponent],
  imports: [BrowserModule, CommonModule, RouterModule.forRoot(routes)],
  providers: [
    GetAccountUseCases,
    { provide: AccountGateway, useClass: AccountGatewayService },
  ],
  bootstrap: [MainComponent],
})
export class MainModule {}
