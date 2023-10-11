import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  source?: any;

  constructor(private httpClient: HttpClient) { 
    this.httpClient.get('/assets/test2.json').subscribe((response) => {
      this.source = response;
    });
  }

  getSource() {
    console.log('Source Service getSource() called');
    return this.source;
  }
}
