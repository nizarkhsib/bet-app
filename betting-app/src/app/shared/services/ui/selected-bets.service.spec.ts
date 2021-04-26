import { TestBed } from '@angular/core/testing';

import { SelectedBetsService } from './selected-bets.service';

describe('SelectedBetsService', () => {
  let service: SelectedBetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedBetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
