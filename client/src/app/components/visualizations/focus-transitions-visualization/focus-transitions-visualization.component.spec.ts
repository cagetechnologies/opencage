import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusTransitionsVisualizationComponent } from './focus-transitions-visualization.component';

describe('FocusTransitionsVisualizationComponent', () => {
  let component: FocusTransitionsVisualizationComponent;
  let fixture: ComponentFixture<FocusTransitionsVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FocusTransitionsVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FocusTransitionsVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
