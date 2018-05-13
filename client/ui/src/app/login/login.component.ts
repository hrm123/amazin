import { Component, OnInit } from '@angular/core';


import {RestApiService} from '../restapi.service';
import {DataService} from '../data.service';
import {Router} from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  btnDisabled = false;

  constructor(private router: Router, private data: DataService, private rest: RestApiService) { }

  ngOnInit() {
  }

  validate(){
    try{
      if(this.email){
        if(this.password){
          return true;
        } else {
          this.data.error("Password is not correct");
        }
      } else {
        this.data.error("Email is not correct");
      }
      return false;
    }
    catch(err){
      this.data.error(err['message']);
    }
    this.btnDisabled = false;
  }

  async login(){
    this.btnDisabled = true;
    try{
      if(this.validate()){
        const data = await this.rest.post("http://localhost:3030/api/accounts/login",
        {
          email: this.email,
          password: this.password,
        }
        );
        if(data['success']){
          localStorage.setItem('token', data['token']);
          this.data.success('Login successfull.');
          await this.data.getProfile();
          this.router.navigate(['/']);
        } else {
          this.data.error(data['message']);
        }

      }
    }
    catch(err){
      this.data.error(err['message']);
    }
    this.btnDisabled = false;
  }
  
}
