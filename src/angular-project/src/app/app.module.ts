import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { MainPageComponent } from './main-page/main-page.component';

import { FunctionalitiesService } from './functionalities.service';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SignInComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '', 
        component: SignInComponent
        /*redirectTo: '/sign-in', 
        pathMatch: 'full'*/
      },
      {
        path: 'main-page',
        component: MainPageComponent
      },
      {
        path: 'sign-in',
        component: SignInComponent
      }
      ])
  ],
  providers: [FunctionalitiesService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
