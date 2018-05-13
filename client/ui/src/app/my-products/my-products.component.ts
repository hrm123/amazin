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
  productsCache: any;

  currentPage = 1;
  pageSize = 20;
  totalSize = 1;

  constructor(private data: DataService, private rest: RestApiService, private router: Router) { }

  loadPage(page: number) {
    this.currentPage = page;
    let startIndex = (this.currentPage-1)*this.pageSize;
    let endIndex = startIndex + this.pageSize;
    this.products = this.productsCache.slice(startIndex, endIndex);
  }

  async ngOnInit() {
    try {
      const data = await this.rest.get('http://localhost:3030/api/seller/products');

      if(data['success'] ) {
        this.productsCache = data['products'];
        this.totalSize = Math.ceil(this.productsCache.length / this.pageSize);
        // this.products = this.productsCache.slice((this.currentPage-1)*this.pageSize, this.pageSize);
        this.loadPage(1);
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
