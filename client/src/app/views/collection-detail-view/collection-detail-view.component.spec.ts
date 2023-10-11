import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionDetailViewComponent } from './collection-detail-view.component';

describe('CollectionDetailViewComponent', () => {
  let component: CollectionDetailViewComponent;
  let fixture: ComponentFixture<CollectionDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
