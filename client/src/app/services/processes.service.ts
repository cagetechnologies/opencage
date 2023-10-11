import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Process } from '../models/process';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessesService {


  processes = new BehaviorSubject<Process[]>([]);

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf(' electron/') > -1) {
      const electron = (<any>window).require('electron');
      electron.ipcRenderer.on('getCollectionsResponse', (event, plugins) => {
        console.log('got an ipc event');
        this.processes.next(plugins);
      });
      /*electron.ipcRenderer.on('addCollectionResponse', (event, collection) => {
      });*/
      electron.ipcRenderer.send('getProcesses', '');
    } else {
      this.httpClient.get('/api/processes', { headers: new HttpHeaders().set('Content-Type', 'application/json').set('X-Access-Token', `Bearer ${this.authService.token}`) }).subscribe((res: any) => {
        this.processes.next(res);
        console.log(JSON.stringify(res));
      });
    }
  }

  addACollection(process: Process) {
    let processes = this.processes.value;
    processes.push(process);
    this.processes.next(processes);
    console.log('Processes is now ' + JSON.stringify(processes));

  }

  addCollection() {
    const electron = (<any>window).require('electron');
    electron.ipcRenderer.send('openDirectory', '');
  }

  deleteCollection(id: string) {
    const electron = (<any>window).require('electron');
    electron.ipcRenderer.send('deleteCollection', id);
  }

  updateProcess(process: Process) {
    let processes = this.processes.value;
    for (let _process of processes) {
      if (_process.id = process.id) {
        _process.json = process.json;
      }
    }
    this.processes.next(processes);
  }

  getProcess(id: string) {
    
  }

  deleteProcess(id: string) {
    let processes = this.processes.value;
    let index = 0;
    let found = -1;
    for (let p of processes) {
      if (p.id == id) {
        console.log('Found at ' + index);
        found = index;
      }
      index += 1;
    }
    if (found !== -1) {
      processes.splice(found, 1);
      this.processes.next(processes);
    }
  }
}
