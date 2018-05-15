import { Component, OnInit } from '@angular/core';
import {RestApiService} from '../restapi.service';
import {DataService} from '../data.service';
import {Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: any;
  category: any;
  page = 1;
  collectionSz = 1;
  pageSize = 10;

  constructor(private data: DataService, private rest: RestApiService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      this.categoryId = res['id'];
      this.getProducts();
    });
  }

  get lower() {
    return this.pageSize * (this.page -1) +1;
  }

  get upper() {
    return Math.min(10 * this.page, this.category.totalProducts);
  }

  async getProducts(page ?: number){
    try {
      if(page) {
        this.category = null;
        this.page = page;
      }
      const data = await this.rest.get(`http://localhost:3030/api/categories/${this.categoryId}?page=${this.page -1}`)
      if(data['success'] ) {
        this.category = data;
        this.collectionSz =  Math.ceil(this.category.totalProducts/ this.pageSize);
      } else {
        this.data.error(data['message']);
      }
    }
    catch(err){
      this.data.error(err['message']);
    }
  }

  navigateTo(url){
    this.router.navigateByUrl(url);
  }



}
