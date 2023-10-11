import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  contacts?: Contact[];

  constructor(private router: Router, private peopleService: PeopleService) { 
    this.peopleService.contacts.subscribe((contacts: Contact[]) => {
      this.contacts = contacts;
    })
  }

  ngOnInit(): void {
  }

  addContact() {
    this.router.navigate(['/add-people']);
  }

}
