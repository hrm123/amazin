import { Component, OnInit } from '@angular/core';

import {RestApiService} from '../restapi.service';
import {DataService} from '../data.service';
import {Router} from '@angular/router'


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any;

  newCategory: '';
  btnDisabled = false;
  constructor(private data: DataService, private rest: RestApiService, private router: Router) { }

  async ngOnInit() {
    try{
      const data = await this.rest.get('http://localhost:3030/api/categories');

      data['success'] 
        ? (this.categories = data['categories'])
        : this.data.error(data['message']);


    }
    catch(err){
      this.data.error(err['message']);
    }
  }

  navigateTo(url){
    debugger;
    console.log('configured routes: ', this.router.config);
    /*
    for (var i = 0; i < this.router.config.length; i++) {
     var routePath:string = this.router.config[i].path;
     console.log(routePath);
   }
   */
    this.router.navigateByUrl(url);
  }

  validate(newCat){
    return true;
  }

  async addCategory() {
    this.btnDisabled = true;
    try {
      if(this.validate(this.newCategory)){
        const data = await this.rest.post('http://localhost:3030/api/categories',{
          name: this.newCategory
        });

        if(data['success']){
          this.data.success(data['message']);
        } else {
          this.data.error(data['message'])
        }
      }
    }
    catch(err){
      this.data.error(err['message']);
    }
    this.btnDisabled = false;
  }

}
