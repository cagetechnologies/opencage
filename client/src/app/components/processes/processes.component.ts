import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { LGraph, LGraphCanvas, LGraphNode, LiteGraph } from 'litegraph.js';
import { Process } from 'src/app/models/process';
import { AuthService } from 'src/app/services/auth.service';
import { KnowledgeService } from 'src/app/services/knowledge.service';
import { PluginsService } from 'src/app/services/plugins.service';
import { ProcessesService } from 'src/app/services/processes.service';
import { UserPluginsService } from 'src/app/services/user-plugins.service';
import { VisualizationsService } from 'src/app/services/visualizations.service';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss']
})
export class ProcessesComponent implements OnInit {

  @ViewChild('nodes')
  wordCloudCanvas: ElementRef<HTMLCanvasElement>;

  processes: any[];
  plugins: any[];
  knowledgeSets: any[];

  process: Process;
  graph : LGraph;

  faPlus = faPlus;
  
  savingProcessAs = false;
  processName: string;
  addingPlugin = false;
  selectedPlugin: any;

  firstNode: LGraphNode;

  constructor(private httpClient: HttpClient, private router: Router, private userPluginsService: UserPluginsService, private visualizationsService: VisualizationsService, private processesService: ProcessesService, private knowledgeSetsService: KnowledgeService, private cdr: ChangeDetectorRef, private authService: AuthService) {

  }

  ngOnInit(): void {

    //this.wordCloudCanvas.width = window.innerWidth;
    //this.wordCloudCanvas.height = window.innerHeight;


    this.graph = new LGraph();
    let graphCanvas = new LGraphCanvas("#nodes", this.graph, { autoresize: true }); //  
    /*var node_const = LiteGraph.createNode("basic/console");
    node_const.pos = [200,200];
    this.graph.add(node_const);*/
    //node_const.setValue(4.5);

    this.userPluginsService.plugins.subscribe((value) => {
      console.log('Detected changes');
      this.plugins = value;
      console.log("Plugins is now " + JSON.stringify(this.plugins));
      this.cdr.detectChanges();
    });

    this.processesService.processes.subscribe((value) => {
      console.log('Detected changes');
      this.processes = value;
      console.log("Processes is now " + JSON.stringify(this.processes));
      this.cdr.detectChanges();
    });

    this.knowledgeSetsService.knowledgeSets.subscribe((value) => {
      this.knowledgeSets = value;
      this.cdr.detectChanges();
    });
    //this.plugins = Plugins.plugins;
  }

  addProcess() {
    this.router.navigate(['/process-create']);
    //this.process = undefined;
    //this.graph.clear();
  }

  addNode() {
    this.addingPlugin = true;
  }



  /*saveProcessAs() {
    this.savingProcessAs = false;
    this.process = { name: this.processName, json: this.graph.serialize() }
    this.saveProcess();
  }*/

  openProcess(process: Process) {
    this.router.navigate(['/processes/' + process.id]);
  }

  addSelectedPlugin() {
    this.addingPlugin = false;

    let node_const = LiteGraph.createNode('bhb/' + this.selectedPlugin.id);
    /*var node_const = new LGraphNode();
    if (this.firstNode) {
      node_const.addInput("in","number");
    } 
    node_const.mode = LiteGraph.ALWAYS;
    node_const.addOutput("out","number");
    node_const.title = this.selectedPlugin.name;*/
    node_const.pos = [300,200];
    /*
    node_const.onExecute = () => {
      if (node_const.getInputData(0)) {
        console.log('Input data is ' + node_const.getInputData(0));
      }
      console.log('Node executed');
      node_const.setOutputData( 0, 10 );
    }*/
    this.graph.add(node_const);

    if (!this.firstNode) {
      this.firstNode = node_const;
    }
  }

  startProcess() {
    console.log('Starting process');
    this.graph.runStep(1);
  }
}
