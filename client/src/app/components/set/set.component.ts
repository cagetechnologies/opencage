import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Collection } from 'src/app/models/collection';
import { AuthService } from 'src/app/services/auth.service';

import { Set } from '../../models/set';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss']
})
export class SetComponent implements OnInit {

  @Input() set: Set;
  @Input() collection: Collection;
  @Input() showDelete = true;

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
  }

  deleteSet() {
    this.httpClient.delete('/api/collections/' + this.collection.id + '/sets/' + this.set.id, { headers: new HttpHeaders().set('Content-Type', 'application/json').set('X-Access-Token', `Bearer ${this.authService.token}`) }).subscribe((result) => {
      //this.collectionsService.deleteCollection(this.collectionId);
      let index = 0;
      let found = -1;
      for (let set of this.collection.sets) {
        if (set === this.set) {
          found = index;
        }
        index++;
      }
      if (found !== -1) {
        this.collection.sets.splice(found, 1);
      }
      //this.router.navigate(['/collections']);
    });
  }

}
