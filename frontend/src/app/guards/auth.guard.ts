import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../service/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkIfUserIsAuthenticated();
  }

  constructor(private userService: UserService,
              private router: Router) {
  }

  private checkIfUserIsAuthenticated(): boolean {
    if (this.userService.isUserAuthenticated()) {
      return true;
    } else {
      this.router.navigateByUrl('/login-facade');
      return false;
    }
  }
}
