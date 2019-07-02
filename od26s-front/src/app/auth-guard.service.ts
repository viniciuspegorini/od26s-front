import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login/login.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.loginService.userInfo;
    if (currentUser) {
      console.log();

      if (route.data.roles && !this.hasAnyRole(currentUser, route.data)) {
        this.router.navigate(['/']);
        return false;
      }

      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  hasAnyRole(userRoles: any, componentRoles: any) {
    let hasRole = false;
    userRoles.authorities.forEach(u => {
      if (componentRoles.roles.includes(u.nome)) {
        hasRole = true;
        return false;
      }
    });
    return hasRole;
  }
}
