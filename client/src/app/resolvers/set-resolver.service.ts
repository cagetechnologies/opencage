import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SetResolverService implements Resolve<any> {

  constructor(private http: HttpClient, private auth: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot) : Observable<any> {
    return this.http.get('/api/collections/' + route.parent.params.id + '/sets/' + route.params.id ,{headers: new HttpHeaders().set('Content-Type','application/json').set('X-Access-Token', `Bearer ${this.auth.token}`)});
  }
}
