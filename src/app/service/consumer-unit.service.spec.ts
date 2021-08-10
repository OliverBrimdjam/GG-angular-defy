import { TestBed } from '@angular/core/testing';

import { ConsumerUnitService } from './consumer-unit.service';

describe('ConsumerUnitService', () => {
  let service: ConsumerUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumerUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
