import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { CollectionsService } from 'src/app/services/collections.service';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-collection-view',
  templateUrl: './collection-view.component.html',
  styleUrls: ['./collection-view.component.scss']
})
export class CollectionViewComponent implements OnInit {
  collection?: any;
  collectionId?: string;

  faTrash = faTrash;

  addingSet = false;
  url = '';

  constructor(private collectionsService: CollectionsService, private httpClient: HttpClient, private route: ActivatedRoute, private router: Router, private confirmationService: ConfirmationService, private authService: AuthService) { 
    this.collectionId = route.snapshot.params.id;
    this.collection = route.snapshot.data.collection;
  }

  ngOnInit(): void {
    /*this.httpClient.get('/api/collections/' + this.collectionId, { headers: new HttpHeaders().set('Content-Type', 'application/json').set('X-Access-Token', `Bearer ${this.authService.token}`) }).subscribe((result) => {
      this.collection = result;
    });*/
  }



}
