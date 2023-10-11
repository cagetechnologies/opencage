import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs/operators';
import { Collection } from 'src/app/models/collection';
import { Set } from 'src/app/models/set';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-set-detail-view',
  templateUrl: './set-detail-view.component.html',
  styleUrls: ['./set-detail-view.component.scss']
})
export class SetDetailViewComponent implements OnInit {

  collection?: Collection;
  set?: Set;

  addingSet = false;
  url = '';

  items: MenuItem[];
  home: MenuItem;
  
  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute, private authService: AuthService) { 
    this.collection = route.snapshot.parent.parent.data.collection;
    //this.collectionId = route.snapshot.params.id;
    this.set = route.snapshot.parent.data.set;
    //this.setId = route.snapshot.params.setId;
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      // You only receive NavigationStart events
      let id = this.route.snapshot.params.id;
      this.httpClient.get('/api/collections/' + this.collection.id + '/sets/' + id, { headers: new HttpHeaders().set('Content-Type', 'application/json').set('X-Access-Token', `Bearer ${this.authService.token}`) }).subscribe((result: Set) => {
        this.set = result;
        this.items = [
          {label: this.collection.name, url: '/collections/' + this.collection.id},
          {label: this.set.name }
        ];
      });
    });
  }

  ngOnInit(): void {
    this.items = [
      {label: this.collection.name, url: '/collections/' + this.collection.id},
      {label: this.set.name }
    ]
    this.home = {label: 'Home', icon: 'pi pi-home', routerLink: '/collections'};
  }

  back() {
    this.router.navigate(['/collections/' + this.collection.id ]);
  }

  addSet() {
    this.addingSet = true;
  }

  deleteSet() {
    this.httpClient.delete('/api/collections/' + this.collection.id + '/sets/' + this.set.id,  { headers: new HttpHeaders().set('Content-Type', 'application/json').set('X-Access-Token', `Bearer ${this.authService.token}`) }).subscribe((result) => {
      this.router.navigate(['/collections/' + this.collection.id ]);
    });
}

  addWebPage() {
    this.httpClient.post('/api/collections/' + this.collection.id + '/sets/' + this.set.id, { url: this.url }, { headers: new HttpHeaders().set('Content-Type', 'application/json').set('X-Access-Token', `Bearer ${this.authService.token}`) }).subscribe((res: any) => {
      //let collection = res;
      //this.collectionsService.addACollection(collection);
      if (!this.set.items) {
        this.set.items = [];
      }
      this.set.items.push(res.item);
      //console.log(res.body);
      this.addingSet = false;
      this.url = '';
    });
  }

  addFiles(event) {
    
    for (let file of event.files) {
      const formData = new FormData();
      formData.append('file', file);

      this.httpClient.post<any>('/api/collections/' + this.collection.id + '/sets/' + this.set.id + '/files', formData, { headers: new HttpHeaders().set('X-Access-Token', `Bearer ${this.authService.token}`) }).subscribe((complete) => {
        this.set.items.push(complete.item);
        this.addingSet = false;
      });

    }

    //fileUpload.clear(); // this will clear your file
}

}
