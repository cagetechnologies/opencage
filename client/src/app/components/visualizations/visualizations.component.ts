import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Analysises } from '../../models/analysises';
import { Pipelines } from '../../models/pipelines';
import { VisualizationDirective } from '../../models/visualization.directive';
import { VisualizationComponent } from '../visualization/visualization.component';
import { Visualizations } from '../../models/visualizations';
import { ProcessesService } from 'src/app/services/processes.service';
import { ChangeDetectorRef } from '@angular/core';
import { VisualizationsService } from 'src/app/services/visualizations.service';
import { LGraph, LGraphCanvas, LiteGraph } from 'litegraph.js';
import { AnalysisService } from 'src/app/services/analysis.service';
import { UserPluginsService } from 'src/app/services/user-plugins.service';

@Component({
  selector: 'app-visualizations',
  templateUrl: './visualizations.component.html',
  styleUrls: ['./visualizations.component.scss']
})
export class VisualizationsComponent implements OnInit {

  @Input() item;
  
  graph: LGraph;

  processes = [];
  analysises = [];
  visualizations = [];

  analysis: any;
  visualization: any;
  process: any;

  faPlus = faPlus;

  constructor(private processesService: ProcessesService, private userPluginsService: UserPluginsService, private analysisService: AnalysisService, private visualizationsService: VisualizationsService, private cdr: ChangeDetectorRef, private componentFactoryResolver: ComponentFactoryResolver) {
    
    this.analysises = Analysises.analysises;
    this.visualizations = [];
    //this.visualization = this.visualizations[0];
  }

  ngOnInit(): void {
    this.processesService.processes.subscribe((value) => {
      console.log('Detected changes');
      this.processes = value;
      console.log("Processes is now " + JSON.stringify(this.processes));
      this.cdr.detectChanges();
    });

    console.log("Setting visualization callback");
    /*this.visualizationService.callback = (visualization: string) => {
      console.log("Going to show the visualization now " + visualization);
    };*/

    if (this.item && this.item.processed) {
      console.log('Going to item processed');
      this.analysisService.analysis.next(this.item.processed);
    }

    this.visualizationsService.results.subscribe((results) => {
      //const viewContainerRef = this.visualizationHost.viewContainerRef;
      //viewContainerRef.clear();
      for (let visualization of results) {
        if (visualization.type) {
          //console.log("Got an update for visualization "+ visualization.type);
          //this.plugins = plugins;
          //console.log("Visualization results is now " + JSON.stringify(results));
          this.cdr.detectChanges();
          if (this.item && this.item.processed) {
            //this.analysisService.analysis.next(JSON.parse(this.item.processed));
          } else {
            //this.analysisService.analysis.next(results.results);
          }
          
          for (let _visualization of Visualizations.visualizations) {
            if (_visualization.id == visualization.type) {
              //visualizationvalue = results.results;
              _visualization['value'] = visualization.value;
              this.visualizations.push(_visualization);

              console.log('Loading visualization component ' + _visualization.id);
            
              //this.loadComponent(_visualization, visualization.value);
            }
          }
        }
      }
    });


    //this.loadComponent(this.visualization, results.results);
  }

  

  /*onPipelineChange(id: string) {
    for (let p of this.pipelines) {
      if (p.id === id) {
        this.analysis = p.analysis;
        this.visualization = p.visualization;
        this.updateVisualization();
      }
    }
  }*/

  onProcessChange(id: string) {
    this.updateNodes();
    console.log('Got process changed ' + id);
    for (let p of this.processes) {
      if (p.id === id) {
        this.analysis = p.analysis;
        this.visualization = p.visualization;
        this.updateVisualization();
      }
    }
  }

  /*onVisualizationChange(visualization: any) {
    console.log('Selected ' + visualization);
    for (let v of this.visualizations) {
      if (v.id === visualization) {
        this.loadComponent(v);
      }
    }
  }*/

  /*onAnalysisChange(analysis: any) {

  }*/

  updateVisualization() {
    for (let v of this.visualizations) {
      if (v.id === this.visualization) {
        //this.loadComponent(v);
      }
    }
  }

  updateNodes() {
    console.log("Openning process");
    this.graph = new LGraph();
    let graphCanvas = new LGraphCanvas("#nodes", this.graph, { autoresize: true }); //  
    console.log("Configuring with " + JSON.stringify(this.process.json));
    this.graph.configure(this.process.json);
  }

  runProcess() {
    console.log("Running process");
    /*let graph = new LGraph();
    let graphCanvas = new LGraphCanvas("#nodes", graph, { autoresize: true }); //  
    console.log("Configuring with " + JSON.stringify(this.process.json));
    graph.configure(this.process.json);*/
    this.visualizationsService.clear();
    this.graph.runStep(1);

    /*for (let visualization of Visualizations.visualizations) {
      if (visualization.id == 'WORD_CLOUD') {
        this.loadComponent(visualization);
      }
    }*/
    
  }

}
