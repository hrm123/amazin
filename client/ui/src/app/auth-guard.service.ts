import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,
RouterStateSnapshot, Router  } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    debugger;
    if(localStorage.getItem('token')){ // logged in
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }

}
