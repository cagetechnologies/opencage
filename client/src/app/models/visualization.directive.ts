import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[visualizationHost]'
})
export class VisualizationDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
