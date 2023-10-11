import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeGraphVisualizationComponent } from './node-graph-visualization.component';

describe('NodeGraphVisualizationComponent', () => {
  let component: NodeGraphVisualizationComponent;
  let fixture: ComponentFixture<NodeGraphVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeGraphVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeGraphVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
