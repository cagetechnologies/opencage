import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionSidebarComponent } from './collection-sidebar.component';

describe('CollectionSidebarComponent', () => {
  let component: CollectionSidebarComponent;
  let fixture: ComponentFixture<CollectionSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
