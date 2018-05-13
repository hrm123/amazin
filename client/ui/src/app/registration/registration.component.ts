import { Component, OnInit } from '@angular/core';

import {RestApiService} from '../restapi.service';
import {DataService} from '../data.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  password1 = '';
  isSeller = false;
  
  btnDisabled = false;

  constructor(private router: Router, private data: DataService, private rest: RestApiService) { }

  validate(){
    if(this.name){
      if(this.email){
        if(this.password){
          if(this.password == this.password1){
            return true;
          } else{
            this.data.error('Confirmation password is different form Password.');  
          }
        } else {
          this.data.error('Password is not entered.');
        }
      } else{
        this.data.error('Email is not entered.');
      }
    }  else {
      this.data.error('Name is not entered.');
    }
    return false;
  }

  async register(){
    this.btnDisabled = true;
    try{
      if(this.validate()){
        const data = await this.rest.post("http://localhost:3030/api/accounts/signup",
        {
          name: this.name,
          email: this.email,
          password: this.password,
          isSeller: this.isSeller
        }
        );
        if(data['success']){
          localStorage.setItem('token', data['token']);
          this.data.success('Registration successfull.');
          await this.data.getProfile();
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

  ngOnInit() {
  }

}
