import { CanActivateFn,
   Router,
    ActivatedRouteSnapshot,
     RouterStateSnapshot,
     CanActivate, 
     
    } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { session } from '../session';
import { AuthGuardService } from 'src/app/service/auth-guard.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthGuardService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    return this.auth.isLoggedIn();
  }
}
