import { TestBed } from '@angular/core/testing';

import { AmostraService } from './amostra.service';

describe('AmostraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AmostraService = TestBed.get(AmostraService);
    expect(service).toBeTruthy();
  });
});
