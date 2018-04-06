import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { UserService } from "./services/user.service";
import { AddUserComponent } from './components/add-user.component';
import { GetUserComponent } from './components/get-user.component';


@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    GetUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
