import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreedVisualizationComponent } from './threed-visualization.component';

describe('ThreedVisualizationComponent', () => {
  let component: ThreedVisualizationComponent;
  let fixture: ComponentFixture<ThreedVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreedVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreedVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
