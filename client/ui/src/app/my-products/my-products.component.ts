import { Component, OnInit } from '@angular/core';

import {RestApiService} from '../restapi.service';
import {DataService} from '../data.service';
import {Router} from '@angular/router'


@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit {
  products: any;
  constructor(private data: DataService, private rest: RestApiService, private router: Router) { }

  async ngOnInit() {
    try {
      const data = await this.rest.get('http://localhost:3030/api/seller/products');

      if(data['success'] ) {
        this.products = data['products'];
        console.log('this.products', this.products);
      } else {
        this.data.error(data['message']);
      }
    }
    catch(err){
      this.data.error(err['message']);
    }    
  }

}
