import { TestBed } from '@angular/core/testing';

import { HealthIndiceService } from './health-indice.service';

describe('HealthIndiceService', () => {
  let service: HealthIndiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthIndiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
