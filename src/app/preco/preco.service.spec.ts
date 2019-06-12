import { TestBed } from '@angular/core/testing';

import { PrecoService } from './preco.service';

describe('PrecoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrecoService = TestBed.get(PrecoService);
    expect(service).toBeTruthy();
  });
});
