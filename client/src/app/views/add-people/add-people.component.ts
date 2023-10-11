import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { AuthService } from 'src/app/services/auth.service';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-add-people',
  templateUrl: './add-people.component.html',
  styleUrls: ['./add-people.component.scss']
})
export class AddPeopleComponent implements OnInit {

  search = '';

  people?: Person[];

  constructor(private httpClient: HttpClient, private contactsService: PeopleService,  private authService: AuthService) { }

  ngOnInit(): void {
  }

  searchPeople() {
    this.httpClient
    .get(
      "/api/people?search=" + this.search,
      { headers: new HttpHeaders().set('X-Access-Token', `Bearer ${this.authService.token}`) }
    )
    .subscribe((results: Person[]) => {
      console.log('Search groups');
      this.people = results;

    });
  }

  addContact(person: Person) {
    this.contactsService.createContact({person: person.id})
  }

}
