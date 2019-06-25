import { TestBed } from '@angular/core/testing';

import { ResultadoService } from './resultado.service';

describe('ResultadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResultadoService = TestBed.get(ResultadoService);
    expect(service).toBeTruthy();
  });
});
