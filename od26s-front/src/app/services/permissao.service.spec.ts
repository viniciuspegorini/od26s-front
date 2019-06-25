import { TestBed } from '@angular/core/testing';

import { PermissaoService } from './permissao.service';

describe('PermissaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PermissaoService = TestBed.get(PermissaoService);
    expect(service).toBeTruthy();
  });
});
