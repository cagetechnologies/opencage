import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Collection } from 'src/app/models/collection';
import { Set } from 'src/app/models/set';
import { Item } from 'src/app/models/item';
import { MenuItem } from 'primeng/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.scss']
})
export class ItemViewComponent implements OnInit {

  collection?: Collection;
  set?: Set;
  item?: Item;

  items: MenuItem[];
  home: MenuItem;

  selectVisualization = true;

  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute, private authService: AuthService) { 
    this.collection = route.parent.parent.snapshot.data.collection;
    this.set = route.parent.snapshot.data.set;
    this.item = route.snapshot.data.item;
  }

  ngOnInit(): void {
    this.items = [
      {label: this.collection.name, url: '/collections/' + this.collection.id},
      {label: this.set.name, url: '/collections/' + this.collection.id + '/sets/' + this.set.id },
      {label: this.item.title }
    ];
    this.home = {label: 'Home', icon: 'pi pi-home', routerLink: '/collections'};
  }

  deleteItem() {
    this.httpClient.delete('/api/collections/' + this.collection.id + '/sets/' + this.set.id + '/items/' + this.item.id,  { headers: new HttpHeaders().set('Content-Type', 'application/json').set('X-Access-Token', `Bearer ${this.authService.token}`) }).subscribe((result) => {
      this.router.navigate(['/collections/' + this.collection.id + '/sets/' + this.set.id ]);
    });
  }

  processItem() {
    this.httpClient.post('/api/collections/' + this.collection.id + '/sets/' + this.set.id + '/items/' + this.item.id + '/process',  {}, { headers: new HttpHeaders().set('Content-Type', 'application/json').set('X-Access-Token', `Bearer ${this.authService.token}`) }).subscribe((result) => {
      if (result) {
        this.item.processed = result['processed'];
      }
    });
  }

  back() {
    this.router.navigate(['/collections/' + this.collection.id + '/sets/' + this.set.id ]);
  }

}
