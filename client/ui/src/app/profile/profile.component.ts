import { Component, OnInit } from '@angular/core';
import {RestApiService} from '../restapi.service';
import {DataService} from '../data.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router, private data: DataService, private rest: RestApiService) { }
  ngOnInit() {
  }

}
