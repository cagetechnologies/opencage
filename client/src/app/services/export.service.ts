import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  results = new BehaviorSubject<any>({text: 'whatever'});

  constructor() { }

  calling(exporting: string) {
    console.log("Calling export " + exporting);
    console.log('What is results ' + this.results);
    window.open("/api/odf",'_blank');
    this.results.next({text: exporting});
  }
}
