import { TestBed } from '@angular/core/testing';

import { DashboardIndividualService } from './dashboard-individual.service';

describe('DashboardIndividualService', () => {
  let service: DashboardIndividualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardIndividualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
