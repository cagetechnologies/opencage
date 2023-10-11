import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextVisualizationComponent } from './text-visualization.component';

describe('TextVisualizationComponent', () => {
  let component: TextVisualizationComponent;
  let fixture: ComponentFixture<TextVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
