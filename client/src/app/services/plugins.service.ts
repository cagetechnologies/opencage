import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LGraphNode, LiteGraph } from 'litegraph.js';
import { BehaviorSubject } from 'rxjs';
import { PluginFactory } from '../models/plugin-factory';
import { PluginRepository } from '../models/plugin-repository';
import { AuthService } from './auth.service';
import { ExportService } from './export.service';
import { VisualizationsService } from './visualizations.service';
import { SourceService } from './source.service';

@Injectable({
  providedIn: 'root'
})
export class PluginsService {

  plugins = new BehaviorSubject<PluginRepository[]>([]);

  sourceNode?: any;

  constructor(private sourceService: SourceService, private visualizationService: VisualizationsService, private exportService: ExportService, private httpClient: HttpClient, private authService: AuthService) {
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf(' electron/') > -1) {
      const electron = (<any>window).require('electron');
      electron.ipcRenderer.on('getCollectionsResponse', (event, plugins) => {
        console.log('got an ipc event');
        this.plugins.next(plugins);
      });
      /*electron.ipcRenderer.on('addCollectionResponse', (event, collection) => {
      });*/
      electron.ipcRenderer.send('getCollections', '');
    } else {
      /*let plugins = authService.user.plugins;
      this.plugins.next(plugins);
      this.init();*/
      this.httpClient.get('/api/plugins', { headers: new HttpHeaders().set('Content-Type', 'application/json').set('X-Access-Token', `Bearer ${this.authService.token}`) }).subscribe((res: any) => {
        this.plugins.next(res);
        console.log(JSON.stringify(res));
        //this.init();
      });
    }
  }

  addACollection(plugin: PluginRepository) {
    let plugins = this.plugins.value;
    plugins.push(plugin);
    this.plugins.next(plugins);
    console.log('Plugins is now ' + JSON.stringify(plugins));

  }

  addCollection() {
    const electron = (<any>window).require('electron');
    electron.ipcRenderer.send('openDirectory', '');
  }

  deleteCollection(id: string) {
    const electron = (<any>window).require('electron');
    electron.ipcRenderer.send('deleteCollection', id);
  }

  async init() {
    let plugin: any = { 
      id: "plugin1",
      name : "Source", 
      handle : "plugin1",
      files: [
        {
          name : "test", 
          src : "test.js"
        }
      ],
      src: "assets/plugins/plugin1"
    };
    PluginFactory.loadScript(plugin,plugin.files[0]
      ).then(() => {
      if (plugin) {
        console.log("Trying to instantiate " + plugin.handle);
        plugin.instance = window.top[plugin.handle];
        if (plugin.instance) {
          console.log('Found plugin instance');
        }
        plugin.loaded = true;
        this.sourceNode = plugin;
        let pluginNode = plugin.instance.factory();
        if (pluginNode.source) {
          console.log("Setting source service");
          pluginNode.prototype.sourceService = () => this.sourceService.getSource();
        }
        LiteGraph.registerNodeType("bhb/" + plugin.handle, pluginNode);
          console.log("Registered node bhb/" + plugin.handle);
      }
    });
    for (let plugin of this.plugins.getValue()) {
      /*var node_const = new LGraphNode();

      node_const.mode = LiteGraph.ALWAYS;
      node_const.pos = [300,200];
      
      node_const.onExecute = () => {
        if (node_const.getInputData(0)) {
          console.log('Input data is ' + node_const.getInputData(0));
        }
        console.log('Node executed');
        node_const.setOutputData( 0, 10 );
      }*/
      let promises: any[] = [];
      

      console.log("Looking at plugin " + plugin.id);
        for (let pluginFile of plugin['files']) {
          promises.push(PluginFactory.loadScript(plugin, pluginFile).then( () => {
            if (plugin) {
              console.log("Trying to instantiate " + plugin.handle);
              plugin.instance = window.top[plugin.handle];
              if (plugin.instance) {
                console.log('Found plugin instance');
              }
              plugin.loaded = true;
            }
          }));
        }
        await Promise.all(promises);
        if (plugin && plugin.instance) {
          console.log('Getting instance');
          let pluginNode = plugin.instance.factory();
          if (pluginNode.source) {
            console.log("Setting source service");
            pluginNode.prototype.sourceService = () => this.sourceService.getSource();
          }
          if (pluginNode.visualization) {
            console.log("Setting visualization Service");
            pluginNode.prototype.visualizationService = (visualization: string, value: any) => {
              this.visualizationService.add(visualization, value);
            };
          }
          if (pluginNode.export) {
            console.log("Setting export service");
            pluginNode.prototype.exportService = (exporting: string) => {
              this.exportService.calling(exporting);
            }
          }
        
        
          LiteGraph.registerNodeType("bhb/" + plugin.handle, pluginNode);
          console.log("Registered node bhb/" + plugin.handle);
        }
    }

    /*function SourceNode() {
      this.addOutput("out","any");

      return this;
    }
    let sourceNode = LiteGraph.createNode("bhb/source");

    sourceNode.title = "Source";
    sourceNode.onExecute = function() {
      console.log("Executed Test");
      let output = { text: 'Hello World'};
      this.setOutputData( 0, output );
    }

    this.sourceNode = sourceNode;*/

    //LiteGraph.registerNodeType("bhb/source", SourceNode);
  }
}
