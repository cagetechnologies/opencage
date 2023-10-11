import { AfterViewInit, ApplicationRef, Compiler, Injector } from '@angular/core';
import { ChangeDetectorRef, Component, OnInit, ViewContainerRef } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from '../../app.component';
import { Collection } from '../../models/collection';
import { CollectionsService } from '../../services/collections.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import * as SystemJS from 'node_modules/systemjs/dist/system.js';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit, AfterViewInit {

  collections: Collection[];

  public viewContainer: ViewContainerRef;

  faPlus = faPlus;

  addingCollection = false;
  name = '';
  //url: string;

  constructor(private _compiler: Compiler, private _injector: Injector, private httpClient: HttpClient, private collectionsService: CollectionsService, private appRef: ApplicationRef, private cdr: ChangeDetectorRef, private authService: AuthService) { }

  ngOnInit(): void {
    this.viewContainer = (this.appRef.components[0].instance as AppComponent).viewRef;

    this.collectionsService.collections.subscribe((value) => {
      console.log('Detected changes');
      this.collections = value;
      //("Collections is now " + JSON.stringify(this.collections));
      this.cdr.detectChanges();
    });

    
  }

  ngAfterViewInit() {
    //this.loadPlugins();
  }
  
  /*async loadPlugins() {
    const module = await SystemJS.import("/assets/plugin4/plugin-a.bundle.js");

    const moduleFactory = await this._compiler.compileModuleAsync<any>(module["PluginAModule"]);

    const moduleRef = moduleFactory.create(this._injector);

    const componentProvider = moduleRef.injector.get('plugins');

    const componentFactory = moduleRef.componentFactoryResolver.resolveComponentFactory<any>(componentProvider[0][0].component);
  }*/

  addCollection() {
    this.addingCollection = true;
  }

  addCollectionDone() {
    this.httpClient.post('/api/collections', { name: this.name }, { headers: new HttpHeaders().set('Content-Type', 'application/json').set('X-Access-Token', `Bearer ${this.authService.token}`) }).subscribe((res: any) => {
      let collection = res;
      this.collectionsService.addACollection(collection);
      //console.log(res.body);
      this.addingCollection = false;
      this.name = '';
    });
  }

  openDocument() {
    this.addingCollection = false;
    this.collectionsService.addCollection();
  }

  openFolder() {
    this.addingCollection = false;
    this.collectionsService.addCollection();
  }

  openURL() {
    this.addingCollection = false;
  }

  deleteCollection(id: string) {
    this.collectionsService.deleteCollection(id);
    let index = 0;
    for (let collection of this.collections) {
      if (collection.id === id) {
        this.collections.splice(index, 1);
        break;
      }
      index++;
    }
  }

  openAddCollection() {
    this.addingCollection = false;
    /*let disposable = this.simpleModalService.addModal(AddCollectionComponent, {
      title: 'Confirm title',
      message: 'Confirm message'
    });*/
  }

  openAddCollection2() {
    //this.modalService.openDialog(this.viewContainer, { title: 'Add Component', childComponent: AddCollectionComponent });
  }

}
