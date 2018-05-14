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

  constructor(private data: DataService, private rest: RestApiService, private router: Router,
    private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      debugger;
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

}
