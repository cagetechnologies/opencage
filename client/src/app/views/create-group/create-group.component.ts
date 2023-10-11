import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {

  name = "";

  constructor(private router: Router, private groupsService: GroupsService) { }

  ngOnInit(): void {
  }

  createGroup() {
    let group = {name: this.name};
    this.groupsService.createGroup(group).then((group: Group) => {
      this.router.navigate(['/groups']);
    });
  }
}
