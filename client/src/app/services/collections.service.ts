import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Collection } from '../models/collection';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  collections = new BehaviorSubject<Collection[]>([]);

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf(' electron/') > -1) {
      const electron = (<any>window).require('electron');
      electron.ipcRenderer.on('getCollectionsResponse', (event, collections) => {
        console.log('got an ipc event');
        this.collections.next(collections);
      });
      /*electron.ipcRenderer.on('addCollectionResponse', (event, collection) => {
      });*/
      electron.ipcRenderer.send('getCollections', '');
    } else {
      this.httpClient.get('/api/collections', { headers: new HttpHeaders().set('Content-Type', 'application/json').set('X-Access-Token', `Bearer ${this.authService.token}`) }).subscribe((res: any) => {
        this.collections.next(res);
        console.log(JSON.stringify(res));
      });
    }
  }

  addACollection(collection: any) {
    let collections = this.collections.value;
    collections.push(collection);
    this.collections.next(collections);
    console.log('Collections is now ' + JSON.stringify(collections));

  }

  addCollection() {
    const electron = (<any>window).require('electron');
    electron.ipcRenderer.send('openDirectory', '');
  }

  deleteCollection(id: string) {
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf(' electron/') > -1) {
      const electron = (<any>window).require('electron');
      electron.ipcRenderer.send('deleteCollection', id);
    } else {
      let collections = this.collections.value;
      let found = -1;
      let index = 0;
      for (let collection of collections) {
        if (collection.id == id) {
          found = index;
        }
        index += 1;
      }
      if (found !== -1) {
        collections.splice(found, 1);
      }
      this.collections.next(collections);
    }
  }
}
