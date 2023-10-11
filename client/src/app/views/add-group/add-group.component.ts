import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group';
import { AuthService } from 'src/app/services/auth.service';
import { GroupsService } from 'src/app/services/groups.service';
import { MembershipsService } from 'src/app/services/memberships.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {

  search = '';

  groups?: Group[];

  constructor(private httpClient: HttpClient, private authService: AuthService, private membershipsService: MembershipsService) { }

  ngOnInit(): void {
  }

  searchGroups() {
    this.httpClient
    .get(
      "/api/groups?search=" + this.search,
      { headers: new HttpHeaders().set('X-Access-Token', `Bearer ${this.authService.token}`) }
    )
    .subscribe((results: Group[]) => {
      console.log('Search groups');
      this.groups = results;

    });
  }

  addGroup(group: Group) {
    this.membershipsService.createMembership({group: group.id})
  }

}
