import { TestBed } from '@angular/core/testing';

import { CardsBaseService } from './cards-base.service';

describe('CardsBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardsBaseService = TestBed.get(CardsBaseService);
    expect(service).toBeTruthy();
  });
});