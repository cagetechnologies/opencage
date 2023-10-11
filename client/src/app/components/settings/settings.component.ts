import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProcessesService } from 'src/app/services/processes.service';
import { UserPluginsService } from 'src/app/services/user-plugins.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  processes: any[];
  plugins: any[];

  constructor(private router: Router, private processesService: ProcessesService, private userPluginsService: UserPluginsService) { 
    
    this.processesService.processes.subscribe((processes) => {
      this.processes = processes;
    })
    
    this.userPluginsService.plugins.subscribe((plugins) => {
      this.plugins = plugins;
    });
  }

  ngOnInit(): void {
  }

  addPipeline() {
    this.router.navigate(['/process-create'])
  }

  openPipeline(pipeline: any) {

  }

  addPlugin() {
    this.router.navigate(['/plugins']);
  }

  openPlugin(plugin: any) {

  }
}
