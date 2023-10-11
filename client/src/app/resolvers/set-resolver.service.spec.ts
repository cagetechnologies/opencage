import { TestBed } from '@angular/core/testing';

import { SetResolverService } from './set-resolver.service';

describe('SetResolverService', () => {
  let service: SetResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
