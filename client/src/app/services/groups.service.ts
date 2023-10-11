import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Group } from '../models/group';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  groups = new BehaviorSubject([]);

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    console.log("Getting groups");
    this.httpClient
    .get(
      "/api/groups",
      { headers: new HttpHeaders().set('X-Access-Token', `Bearer ${this.authService.token}`) }
    )
    .subscribe((results: Group[]) => {
      console.log('Got groups');
      let groups = results;

      this.groups.next(groups);

    });
  }

  createGroup(group: Group) {
    let promise = new Promise<Group>((resolve, reject) => {
      this.httpClient
        .post(
          "/api/groups",
          group,
          { headers: new HttpHeaders().set("Content-Type", "application/json").set('X-Access-Token', `Bearer ${this.authService.token}`) }
        )
        .toPromise()
        .then(result => {
          console.log(result);
          if (result["result"] == 0) {
            let groups = this.groups.value;
            groups.push(result['group']);
            this.groups.next(groups);
            resolve(result["group"]);
          } else {
            reject();
          }
        });
    });

    return promise;
  }
}
