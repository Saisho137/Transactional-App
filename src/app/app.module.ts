import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AccountGateway } from './domain/models/account/account.gateway';
import { GetAccountUseCases } from './domain/usecases/account/get-account.usecases';
import { AccountGatewayService } from './infraestructure/gateways/account/account-gateway.service';
import { CommonModule } from '@angular/common';
import { MainComponent } from './Presentation/main/main.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [];

@NgModule({
  declarations: [MainComponent],
  imports: [BrowserModule, CommonModule, RouterModule.forRoot(routes)],
  providers: [
    GetAccountUseCases,
    { provide: AccountGateway, useClass: AccountGatewayService },
  ],
  bootstrap: [MainComponent],
})
export class AppModule {}
