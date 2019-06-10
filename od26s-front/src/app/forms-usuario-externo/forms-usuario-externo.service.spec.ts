import { TestBed } from '@angular/core/testing';

import { FormsUsuarioExternoService } from './forms-usuario-externo.service';

describe('FormsUsuarioExternoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormsUsuarioExternoService = TestBed.get(FormsUsuarioExternoService);
    expect(service).toBeTruthy();
  });
});
