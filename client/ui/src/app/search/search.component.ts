import { Component, OnInit } from '@angular/core';

import {RestApiService} from '../restapi.service';
import {DataService} from '../data.service';
import {Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  query: string;
  page = 1;
  JSON: any;
  content: any;

  constructor(private data: DataService, private rest: RestApiService, private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.JSON = JSON;
     }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      this.query = res['query'];
      this.page = 1;
      // this.getProducts();
      let qry = this.query || '';
console.log(qry);
      this.rest.get(`http://localhost:3030/api/search?query=${qry}&page=${this.page -1}`)
      .then(data => {
        data['success']
        ? (this.content = data['content'])
        : this.router.navigate(['/'])
      })
      .catch( error => this.data.error(error['message']));
    })    
  }

  get lower() {
    return 1 + (this.content.hitsPerpage * this.content.page);
  }

  get upper() {
    return Math.min(
      this.content.hitsPerpage * this.content.page,
      this.content.nbHits
    );
  }

  async getProducts(){
    this.content = null;

    try {
      const data = await this.rest.get(`http://localhost:3030/api/search?query=${this.query}&page=${this.page -1}`)
      if(data['success'] ) {
        this.content = data['content'];
        // this.collectionSz =  Math.ceil(this.category.totalProducts/ this.pageSize);
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
