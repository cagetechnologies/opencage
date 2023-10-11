import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from '../models/contact';
import { CreateContact } from '../models/create-contact';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  contacts = new BehaviorSubject([]);

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    console.log("Getting contacts");
    this.httpClient
    .get(
      "/api/contacts",
      { headers: new HttpHeaders().set('X-Access-Token', `Bearer ${this.authService.token}`) }
    )
    .subscribe((results: Contact[]) => {
      console.log('Got contacts');
      let contacts = results;

      this.contacts.next(contacts);

    });
  }

  createContact(createContact: CreateContact) {
    let promise = new Promise<Contact>((resolve, reject) => {
      this.httpClient
        .post(
          "/api/contacts",
          createContact,
          { headers: new HttpHeaders().set("Content-Type", "application/json").set('X-Access-Token', `Bearer ${this.authService.token}`) }
        )
        .toPromise()
        .then(result => {
          console.log(result);
          if (result["result"] == 0) {
            let contacts = this.contacts.value;
            contacts.push(result['contact']);
            this.contacts.next(contacts);
            resolve(result["contact"]);
          } else {
            reject();
          }
        });
    });

    return promise;
  }
}
