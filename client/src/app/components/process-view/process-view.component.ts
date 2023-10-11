import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LGraph, LGraphCanvas, LiteGraph } from 'litegraph.js';
import { Process } from 'src/app/models/process';
import { AuthService } from 'src/app/services/auth.service';
import { ProcessesService } from 'src/app/services/processes.service';
import { UserPluginsService } from 'src/app/services/user-plugins.service';

@Component({
  selector: 'app-process-view',
  templateUrl: './process-view.component.html',
  styleUrls: ['./process-view.component.scss']
})
export class ProcessViewComponent implements OnInit {

  id: string;

  process: Process;

  plugins: any[];

  addingPlugin = false;
  selectedPlugin: any;
  firstNode: any;

  @ViewChild('nodes')
  wordCloudCanvas: ElementRef<HTMLCanvasElement>;
  graph : LGraph;

  constructor(private httpClient: HttpClient, private router: Router, private userPluginsService: UserPluginsService, private processesService: ProcessesService, private cdr: ChangeDetectorRef, private route: ActivatedRoute, private authService: AuthService) { 
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.userPluginsService.plugins.subscribe((value) => {
      console.log('Detected changes');
      this.plugins = value;
      console.log("Plugins is now " + JSON.stringify(this.plugins));
      this.cdr.detectChanges();
    });

    this.httpClient.get('/api/processes/' + this.id, { headers: new HttpHeaders().set('Content-Type', 'application/json').set('X-Access-Token', `Bearer ${this.authService.token}`) }).subscribe((result: any) => {
      this.process = result;

      this.graph = new LGraph();
      this.graph.configure(this.process.json);
      let graphCanvas = new LGraphCanvas("#nodes", this.graph, { autoresize: true }); //  
      graphCanvas.resize();
    });
  }

  ngAfterViewInit() {


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

  save() {
    /*if (!this.process) {
      this.savingProcessAs = true;
    } else {
      
      
      if (process.id === undefined) {
        let process = { name: this.name, json: this.graph.serialize() };
        //console.log(JSON.stringify(this.graph.serialize()));
        this.httpClient.post('/api/processes', process, { headers: new HttpHeaders().set('Content-Type', 'application/json').set('X-Access-Token', `Bearer ${this.authService.token}`) }).subscribe((res: any) => {
          //this.process = res.process;
          this.processesService.addACollection(res.process);
          //console.log(res.body);
          //this.addingCollection = false;
          //this.url = '';
        });
      } else {*/
        this.process.json = this.graph.serialize();
        this.httpClient.post('/api/processes/' + this.process['id'], this.process, { headers: new HttpHeaders().set('Content-Type', 'application/json').set('X-Access-Token', `Bearer ${this.authService.token}`) }).subscribe((res: any) => {
          //this.process = res.process;
          //this.processesService.addACollection(this.process);
          this.processesService.updateProcess(this.process);
          //console.log(res.body);
          //this.addingCollection = false;
          //this.url = '';
        });
      /*}


    }*/
  }

  delete() {
    this.httpClient.delete('/api/processes/' + this.process['id'], { headers: new HttpHeaders().set('Content-Type', 'application/json').set('X-Access-Token', `Bearer ${this.authService.token}`) }).subscribe((res: any) => {
      this.processesService.deleteProcess(this.process.id);
      this.router.navigate(['/processes']);
    });
  }

}
