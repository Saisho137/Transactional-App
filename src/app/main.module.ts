import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { GetAccountUseCases } from '@/app/domain/usecases/account/crud-account.usecases';
import { GetBalanceUseCase } from '@/app/domain/usecases/account/get-balance.usecase';
import { AccountGateway } from '@/app/domain/models/account/account.gateway';
import { AccountGatewayService } from '@/app/infraestructure/gateways/account-gateway.service';
import { MainComponent } from '@/app/Presentation/UI/main/main.component';
import { Routes, RouterModule } from '@angular/router';
import { UserInfoComponent } from '@/app/Presentation/UI/user-info/user-info.component';
import { UsersTableComponent } from '@/app/Presentation/UI/users-table/users-table.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'users-table',
    component: UsersTableComponent,
    pathMatch: 'full',
    title: 'Admin Panel',
  },
  { path: '', redirectTo: '/users-table', pathMatch: 'prefix' },
];

@NgModule({
  declarations: [MainComponent, UserInfoComponent, UsersTableComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    GetAccountUseCases,
    GetBalanceUseCase,
    { provide: AccountGateway, useClass: AccountGatewayService },
  ],
  bootstrap: [MainComponent],
})
export class MainModule {}
