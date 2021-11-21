import { TestBed } from '@angular/core/testing';

import { ChuckjokesService } from './chuckjokes.service';

describe('ChuckjokesService', () => {
  let service: ChuckjokesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChuckjokesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
