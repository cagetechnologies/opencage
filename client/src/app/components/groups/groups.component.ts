import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group';
import { Membership } from 'src/app/models/membership';
import { GroupsService } from 'src/app/services/groups.service';
import { MembershipsService } from 'src/app/services/memberships.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groups?: Group[];
  memberships?: Membership[];
  
  constructor(private router: Router, private groupsService: GroupsService, private membershipsService: MembershipsService) {
    this.groupsService.groups.subscribe((groups: Group[]) => {
      this.groups = groups;
    });
    this.membershipsService.memberships.subscribe((memberships: Membership[]) => {
      this.memberships = memberships;
    });
  }

  ngOnInit(): void {
  }

  addGroup() {
    this.router.navigate(['/add-group']);
  }

  createGroup() {
    this.router.navigate(['/create-group']);
  }

}
