import { TestBed, inject } from '@angular/core/testing';

import { PromoStorageService } from './promo-storage.service';

describe('PromoStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PromoStorageService]
    });
  });

  it('should be created', inject([PromoStorageService], (service: PromoStorageService) => {
    expect(service).toBeTruthy();
  }));
});
