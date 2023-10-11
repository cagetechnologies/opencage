import { Component, ComponentFactoryResolver, Input, ViewChild } from '@angular/core';
import { VisualizationDirective } from 'src/app/models/visualization.directive';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss']
})
export class VisualizationComponent {

  @ViewChild(VisualizationDirective, { static: true }) visualizationHost: VisualizationDirective;

  @Input() visualization;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    
  }

  ngOnInit() {
    this.loadComponent(this.visualization, this.visualization.value);
  }

  loadComponent(visualization: any, value: any) {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(visualization.component);

    const viewContainerRef = this.visualizationHost.viewContainerRef;
    
    //viewContainerRef.createComponent()
    //viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<Component>(componentFactory);
    componentRef.instance['value'] = value;
  }

}
