import { TestBed } from '@angular/core/testing';

import { HealthGoalsServiceService } from './health-goals-service.service';

describe('HealthGoalsServiceService', () => {
  let service: HealthGoalsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthGoalsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
