import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetDetailViewComponent } from './set-detail-view.component';

describe('SetDetailViewComponent', () => {
  let component: SetDetailViewComponent;
  let fixture: ComponentFixture<SetDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
