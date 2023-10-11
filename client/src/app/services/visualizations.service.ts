import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisualizationsService {

  results = new BehaviorSubject<any>([]);

  visualizations = [];

  constructor() { 
    
  }

  clear() {
    this.visualizations = [];
    this.results.next(this.visualizations);
  }

  add(visualization: string, value: any) {
    console.log("Adding visualization " + visualization);
    console.log('With value ' + JSON.stringify(value));
    this.visualizations.push({type: visualization, value: value});
    this.results.next(this.visualizations);
  }
}
