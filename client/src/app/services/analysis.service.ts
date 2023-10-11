import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  analysis = new BehaviorSubject<any>([]);

  constructor(private httpClient: HttpClient) {
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf(' electron/') > -1) {
      const electron = (<any>window).require('electron');
      electron.ipcRenderer.on('getJSONResponse', (event, analysis) => {
        console.log('got an ipc event');
        this.analysis.next(analysis);
      });
    } else {
      this.getAnalysis('test1');
    }
  }

  getAnalysis(filename: string) {
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf(' electron/') > -1) {
      const electron = (<any>window).require('electron');
      electron.ipcRenderer.send('openFile', filename);
    } else {
      this.httpClient.get('/api/collections/something/text').subscribe((res)=> {
        this.analysis.next(res);
      });
    }
  }
}
