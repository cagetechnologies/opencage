import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetSidebarComponent } from './set-sidebar.component';

describe('SetSidebarComponent', () => {
  let component: SetSidebarComponent;
  let fixture: ComponentFixture<SetSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
