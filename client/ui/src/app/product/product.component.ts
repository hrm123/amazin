import { Component, OnInit } from '@angular/core';
import {RestApiService} from '../restapi.service';
import {DataService} from '../data.service';
import {Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: any;
  JSON : any;

  myReview: any = {
    title: '',
    desciption: '',
    rating: 0
  };

  btnDisabled = false;

  constructor(private data: DataService, private rest: RestApiService, private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.JSON = JSON;
     }


  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      let id = res['id'];
      this.rest.get(`http://localhost:3030/api/product/${id}`)
      .then(data => {
        data['success']
        ? (this.product = data['product'])
        : this.router.navigate(['/'])
      })
      .catch( error => this.data.error(error['message']));
    })
  }

  async postReview() {
    debugger;
    this.btnDisabled = true;
    try {
      const data = await this.rest.post(
        'http://localhost:3030/api/review',
        Object.assign({}, {
          productId : this.product._id
        }, this.myReview)
      );
      data['success']
        ? this.data.success(data['message'])
      : this.data.error(data['message']);
    }
    catch(e) {
      this.data.error(e['message']);
    }
    this.btnDisabled = false;
  }

}
