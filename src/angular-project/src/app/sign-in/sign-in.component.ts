import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { FunctionalitiesService } from '../functionalities.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
   providers: [FunctionalitiesService],
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  login = false;

  constructor(private router:Router, private _funcService: FunctionalitiesService) { }

  ngOnInit() {
    
  }
  
  signIn(form){
    
    var email = form.value['email'];
    var password = form.value['password'];
    
    this._funcService.checkLogin(email, password, this.onLoginResponse.bind(this));
    
    
  }
  
  onLoginResponse(res){
    console.log(res)
    if(res != "ERROR")
      this.router.navigate(['/main-page']);
    else
      alert('Email or password incorrect. Try again.');
  }

}
