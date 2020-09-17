import { TestBed } from '@angular/core/testing';

import { PrestataireService } from './prestataire.service';

describe('PrestataireService', () => {
  let service: PrestataireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestataireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
