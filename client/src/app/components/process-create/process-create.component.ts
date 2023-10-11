import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LGraph, LGraphCanvas, LGraphNode, LiteGraph } from 'litegraph.js';
import { AuthService } from 'src/app/services/auth.service';
import { PluginsService } from 'src/app/services/plugins.service';
import { ProcessesService } from 'src/app/services/processes.service';
import { UserPluginsService } from 'src/app/services/user-plugins.service';

@Component({
  selector: 'app-process-create',
  templateUrl: './process-create.component.html',
  styleUrls: ['./process-create.component.scss']
})
export class ProcessCreateComponent implements OnInit, AfterViewInit {

  name: string;

  plugins: any[];

  newName = '';
  savingAs = false;
  addingPlugin = false;
  selectedPlugin: any;
  firstNode: any;

  @ViewChild('nodes')
  wordCloudCanvas: ElementRef<HTMLCanvasElement>;
  graph : LGraph;
  
  constructor(private httpClient: HttpClient, private pluginsService: PluginsService, private userPluginsService: UserPluginsService, private processesService: ProcessesService, private cdr: ChangeDetectorRef, private authService: AuthService) { }

  ngOnInit(): void {
    /*this.pluginsService.plugins.subscribe((value) => {
      console.log('Detected changes');
      this.plugins = value;
      console.log("Plugins is now " + JSON.stringify(this.plugins));
      this.cdr.detectChanges();
    });*/

    this.userPluginsService.plugins.subscribe((value) => {
      console.log('Detected changes');
      this.plugins = value;
      console.log("Plugins is now " + JSON.stringify(this.plugins));
      this.cdr.detectChanges();
    });

    this.graph = new LGraph();

    /*sourceNode.addOutput("out", "any");
    sourceNode.pos = [300,200];
    sourceNode.onExecute = () => {
      console.log('Node executed');
      sourceNode.setOutputData( 0, '{}' );
    }*/

    //this.graph.add(this.pluginsService.sourceNode);

    let node_const = LiteGraph.createNode('bhb/plugin1');
    /*var node_const = new LGraphNode();
    if (this.firstNode) {
      node_const.addInput("in","number");
    } 
    node_const.mode = LiteGraph.ALWAYS;
    node_const.addOutput("out","number");
    node_const.title = this.selectedPlugin.name;*/
    node_const.pos = [300,150];
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

  ngAfterViewInit() {

    let graphCanvas = new LGraphCanvas("#nodes", this.graph, { skip_render: false, autoresize: true }); 
    graphCanvas.resize();
  }

  addNode() {
    this.addingPlugin = true;
  }

  addSelectedNode() {
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

  saveAs() {
    this.savingAs = true;
  }

  save() {
    if (this.savingAs) {
      this.savingAs = false;
      this.name = this.newName;
      this.newName = '';
    }
    /*if (!this.process) {
      this.savingProcessAs = true;
    } else {
      
      this.process.json = this.graph.serialize();
      if (process.id === undefined) {*/
        let process = { name: this.name, json: this.graph.serialize() };
        //console.log(JSON.stringify(this.graph.serialize()));
        this.httpClient.post('/api/processes', process, { headers: new HttpHeaders().set('Content-Type', 'application/json').set('X-Access-Token', `Bearer ${this.authService.token}`) }).subscribe((res: any) => {
          //this.process = res.process;
          this.processesService.addACollection(res.process);
          //console.log(res.body);
          //this.addingCollection = false;
          //this.url = '';
        });
      /*} else {
        this.httpClient.post('/api/processes/' + this.process.id, this.process, { headers: new HttpHeaders().set('Content-Type', 'application/json').set('X-Access-Token', `Bearer ${this.authService.token}`) }).subscribe((res: any) => {
          //this.process = res.process;
          //this.processesService.addACollection(this.process);
          this.processesService.updateProcess(this.process);
          //console.log(res.body);
          //this.addingCollection = false;
          //this.url = '';
        });
      }


    }*/
  }

}
