import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private httpClient: HttpClient) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isLoggedIn) {
      return true;
    }

    const tokenCookie = localStorage.getItem('token');
    if (tokenCookie != null) {
      this.authService.token = tokenCookie;
      return new Promise<boolean>((resolve, reject) => {
        console.log('Fetching user info in auth guard');
        this.httpClient.get('/api/user', { headers: new HttpHeaders().set('Content-Type', 'application/json').set('X-Access-Token', `Bearer ${this.authService.token}`) }).subscribe((result: any) => {
          if (result) {
            this.authService.isLoggedIn = true;
            this.authService.user = result;
            resolve(true);
          } else {
            resolve(false);
          }

        }, (error) => {
          this.authService.isLoggedIn = false;
          resolve(true);
        });
      });
    }

    return true;
  }
}
