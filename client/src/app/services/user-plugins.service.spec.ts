import { TestBed } from '@angular/core/testing';

import { UserPluginsService } from './user-plugins.service';

describe('UserPluginsService', () => {
  let service: UserPluginsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPluginsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
