import { TestBed } from '@angular/core/testing';

import { SpecialisationService } from './specialisation.service';

describe('SpecialisationService', () => {
  let service: SpecialisationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialisationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
