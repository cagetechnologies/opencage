import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LiteGraph } from 'litegraph.js';
import { BehaviorSubject } from 'rxjs';
import { PluginFactory } from '../models/plugin-factory';
import { PluginRepository } from '../models/plugin-repository';
import { AuthService } from './auth.service';
import { ExportService } from './export.service';
import { SourceService } from './source.service';
import { VisualizationsService } from './visualizations.service';

@Injectable({
  providedIn: 'root'
})
export class UserPluginsService {

  plugins = new BehaviorSubject<PluginRepository[]>([]);

  constructor(private httpClient: HttpClient, private sourceService: SourceService, private visualizationService: VisualizationsService, private exportService: ExportService, private authService: AuthService) {
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
      /*this.httpClient.get('/api/plugins', { headers: new HttpHeaders().set('Content-Type', 'application/json').set('X-Access-Token', `Bearer ${this.authService.token}`) }).subscribe((res: any) => {
        this.plugins.next(res);
        this.init();
        console.log(JSON.stringify(res));
      });*/
      let plugins = this.authService.user.plugins;

      if (!plugins) {
        plugins = [];
      }

      this.plugins.next(plugins);
      this.init();
    }
  }

  async init() {
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
      console.log("Initializing plugin " + plugin.id);
        for (let pluginFile of plugin['files']) {
          promises.push(PluginFactory.loadScript(plugin, pluginFile).then( () => {
            if (plugin) {
              console.log("Instantiating plugin " + plugin.id);
              plugin.instance = window.top[plugin.id];
              plugin.loaded = true;
            }
          }));
        }
        await Promise.all(promises);
        if (plugin && plugin.instance) {
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
        
          console.log("Registered node bhb/" + plugin.id);
          LiteGraph.registerNodeType("bhb/" + plugin.id, pluginNode);
          
        }
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
}
