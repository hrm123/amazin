import { Component } from '@angular/core';
import {DataService} from './data.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  searchTerm = '';
  isCollapsed=true;

  constructor(private router: Router, private data: DataService){
     //this.data.getProfile(); //TODO
  }

  get token() {
    return localStorage.getItem('token');
  }

  collapse() {
    this.isCollapsed = true;
  }

  closeDropdown(dropdown){
    dropdown.close();
  }

  logout() {
    this.data.user = {};
    localStorage.clear();
    this.router.navigate(['']);
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

  search() {}


}
