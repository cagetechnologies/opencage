import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { CollectionsService } from 'src/app/services/collections.service';
import { VisualizationsService } from 'src/app/services/visualizations.service';

@Component({
  selector: 'app-collection-detail-view',
  templateUrl: './collection-detail-view.component.html',
  styleUrls: ['./collection-detail-view.component.scss']
})
export class CollectionDetailViewComponent implements OnInit {

  collection?: any;
  collectionId?: string;

  visualization?: any;

  faTrash = faTrash;

  selectVisualization = false;
  addingSet = false;
  url = '';

  items: MenuItem[];
  home: MenuItem;
  
  constructor(private collectionsService: CollectionsService, private httpClient: HttpClient, private route: ActivatedRoute, private router: Router, private confirmationService: ConfirmationService, private visualizationService: VisualizationsService, private authService: AuthService) { 
    this.collection = this.route.snapshot.parent.data.collection;

    this.visualizationService.results.subscribe((visualization: any) => {
      console.log('Received visualization');
      this.visualization = visualization;
    });
  }

  ngOnInit(): void {
    this.items = [
      {label: this.collection.name},
    ];
    this.home = {label: 'Home', icon: 'pi pi-home', routerLink: '/collections'};

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      // You only receive NavigationStart events
      this.collectionId = this.route.snapshot.params.id;
      this.httpClient.get('/api/collections/' + this.collectionId, { headers: new HttpHeaders().set('Content-Type', 'application/json').set('X-Access-Token', `Bearer ${this.authService.token}`) }).subscribe((result) => {
        this.collection = result;
        this.items = [
          {label: this.collection.name},
        ];
      });
    });
    /*this.route.paramMap.subscribe(params => {
      this.collectionId = params.get('id');
      
      // Do more processing here if needed
    });*/
  }

  deleteCollection() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.httpClient.delete('/api/collections/' + this.collection.id, { headers: new HttpHeaders().set('Content-Type', 'application/json').set('X-Access-Token', `Bearer ${this.authService.token}`) }).subscribe((result) => {
          this.collectionsService.deleteCollection(this.collection.id);
          this.router.navigate(['/collections']);
        });
      }
    });
    
  }

  addSet() {
    this.addingSet = true;
  }

  addWebPage() {
    this.httpClient.post('/api/collections/' + this.collection.id + '/urls', { url: this.url }, { headers: new HttpHeaders().set('Content-Type', 'application/json').set('X-Access-Token', `Bearer ${this.authService.token}`) }).subscribe((res: any) => {
      //let collection = res;
      //this.collectionsService.addACollection(collection);
      if (!this.collection.sets) {
        this.collection.sets = [];
      }
      this.collection.sets.push(res.set);
      //console.log(res.body);
      this.addingSet = false;
      this.url = '';
      let collections = this.collectionsService.collections.getValue();
      for (let collection of collections) {
        if (collection.id == this.collection.id) {
          collection.sets = this.collection.sets;
        }
      }
      this.collectionsService.collections.next(collections);
    });
  }

  addFiles(event) {
    
      for (let file of event.files) {
        const formData = new FormData();
        formData.append('file', file);

        this.httpClient.post<any>('/api/collections/' + this.collection.id + '/files', formData, { headers: new HttpHeaders().set('X-Access-Token', `Bearer ${this.authService.token}`) }).subscribe((complete) => {
          this.collection.sets.push(complete.set);
          this.addingSet = false;
        });

      }
  
      //fileUpload.clear(); // this will clear your file
  }

}
