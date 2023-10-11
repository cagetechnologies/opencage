import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CreateMembership } from '../models/create-membership';
import { Membership } from '../models/membership';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MembershipsService {

  memberships = new BehaviorSubject([]);

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    console.log("Getting memberships");
    this.httpClient
    .get(
      "/api/memberships",
      { headers: new HttpHeaders().set('X-Access-Token', `Bearer ${this.authService.token}`) }
    )
    .subscribe((results: Membership[]) => {
      console.log('Got memberships');
      let memberships = results;

      this.memberships.next(memberships);

    });
  }

  createMembership(createMembership: CreateMembership) {
    let promise = new Promise<Membership>((resolve, reject) => {
      this.httpClient
        .post(
          "/api/memberships",
          createMembership,
          { headers: new HttpHeaders().set("Content-Type", "application/json").set('X-Access-Token', `Bearer ${this.authService.token}`) }
        )
        .toPromise()
        .then(result => {
          console.log(result);
          if (result["result"] == 0) {
            let memberships = this.memberships.value;
            memberships.push(result['membership']);
            this.memberships.next(memberships);
            resolve(result["membership"]);
          } else {
            reject();
          }
        });
    });

    return promise;
  }
}
