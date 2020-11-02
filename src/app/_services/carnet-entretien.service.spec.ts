import { TestBed } from '@angular/core/testing';

import { CarnetEntretienService } from './carnet-entretien.service';

describe('CarnetEntretienService', () => {
  let service: CarnetEntretienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarnetEntretienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
