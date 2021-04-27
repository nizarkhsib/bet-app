import { TestBed } from '@angular/core/testing';

import { CountryFlagUrlService } from './country-flag-url.service';

describe('CountryFlagUrlService', () => {
  let service: CountryFlagUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryFlagUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
