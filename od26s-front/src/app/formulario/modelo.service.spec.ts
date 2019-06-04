import { TestBed } from '@angular/core/testing';

import { ModeloService } from './modelo.service';

describe('ModeloService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModeloService = TestBed.get(ModeloService);
    expect(service).toBeTruthy();
  });
});
