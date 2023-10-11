import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApplicationRef, ChangeDetectorRef, Component, OnInit, ViewContainerRef } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { LiteGraph } from 'litegraph.js';
import { AppComponent } from 'src/app/app.component';
import { PluginRepository } from 'src/app/models/plugin-repository';
import { AuthService } from 'src/app/services/auth.service';
import { PluginsService } from 'src/app/services/plugins.service';
import { UserPluginsService } from 'src/app/services/user-plugins.service';
import { PluginFactory } from '../../models/plugin-factory';



@Component({
  selector: 'app-plugins',
  templateUrl: './plugins.component.html',
  styleUrls: ['./plugins.component.scss']
})
export class PluginsComponent implements OnInit {

  plugins = [];
  userPluginsMap = {};

  searchPlugin = '';
  filterargs = null;

  //availablePlugins = PluginFactory.plugins;

  public viewContainer: ViewContainerRef;

  faPlus = faPlus;

  addingPlugin = false;

  pluginSrc: string;

  plugin: PluginRepository;

  constructor(private httpClient: HttpClient, private userPluginsService: UserPluginsService, private pluginsService: PluginsService, private appRef: ApplicationRef, private cdr: ChangeDetectorRef, private authService: AuthService) {
    //this.plugins = PluginFactory.plugins;
  }

  ngOnInit(): void {
    this.viewContainer = (this.appRef.components[0].instance as AppComponent).viewRef;

    this.userPluginsService.plugins.subscribe((userPlugins) => {
      console.log('Detected changes');
      for (let userPlugin of userPlugins) {
        this.userPluginsMap[userPlugin.id] = userPlugin;
      }
    });

    this.pluginsService.plugins.subscribe((plugins) => {
      this.plugins = plugins;
      console.log("Plugins is now " + JSON.stringify(this.plugins));
      this.cdr.detectChanges();
    });
  }

  addPlugin() {
    this.addingPlugin = true;
  }

  getWebPage() {
    
  }

  openPlugin() {
    this.addingPlugin = false;

    // 'http://192.168.1.12:4200/assets/plugin1'
    let plugin: PluginRepository = {
      src: this.pluginSrc
    }

    this.loadPlugin(plugin).then(() => {
      this.userPluginsService.addACollection(plugin);
      plugin.instance['run']();
    });

  }

  loadPlugins() {
    for (let plugin of this.plugins) {
      if (!plugin.loaded) {
        this.loadPlugin(plugin);
      }
    }
  }

  loadPlugin(plugin: PluginRepository): Promise<void> {

    return new Promise<void>((resolve, reject) => {
      this.httpClient.post('/api/user/load-plugin', plugin, { headers: new HttpHeaders().set('Content-Type', 'application/json').set('X-Access-Token', `Bearer ${this.authService.token}`) }).subscribe(async (result) => {
        let pluginData = result;
        plugin.id = pluginData['id'];
        plugin.name = pluginData['name'];
        let promises: any[] = [];
        for (let pluginFile of pluginData['files']) {
          promises.push(PluginFactory.loadScript(plugin, pluginFile).then( () => {
            plugin.instance = window.top[plugin.id];
            plugin.loaded = true;
          }));
        }
        await Promise.all(promises);
        resolve();
      });
    });
    
  }

  /*scripts: Scripts[] = [
    {
      name: 'test',
      src: "http://erichey.com/js/test.js"
    }
  ];*/

  displayPlugin(plugin: PluginRepository) {
      this.plugin = plugin;
  }

  installPlugin(plugin: PluginRepository) {
    this.httpClient.post('/api/user/plugins', plugin, { headers: new HttpHeaders().set('Content-Type', 'application/json').set('X-Access-Token', `Bearer ${this.authService.token}`) }).subscribe(async (result) => {
      /*let pluginData = result;
      plugin.id = pluginData['id'];
      plugin.name = pluginData['name'];*/
      let promises: any[] = [];
      for (let pluginFile of plugin['files']) {
        promises.push(PluginFactory.loadScript(plugin, pluginFile).then( () => {
          plugin.instance = window.top[plugin.id];
          plugin.loaded = true;
        }));
      }
      await Promise.all(promises);
      LiteGraph.registerNodeType("bhb/" + plugin.id, plugin.instance.factory());
      this.userPluginsMap[plugin.id] = plugin;
    });
  }

  updateFilter() {
    this.filterargs = { name: this.searchPlugin };
  }
}
