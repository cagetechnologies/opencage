import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesVisualizationComponent } from './notes-visualization.component';

describe('NotesVisualizationComponent', () => {
  let component: NotesVisualizationComponent;
  let fixture: ComponentFixture<NotesVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
