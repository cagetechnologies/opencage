import { TestBed } from '@angular/core/testing';

import { VisualizationsService } from './visualizations.service';

describe('VisualizationService', () => {
  let service: VisualizationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualizationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
