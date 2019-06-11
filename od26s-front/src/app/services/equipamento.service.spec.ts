import { TestBed } from '@angular/core/testing';

import { EquipamentoService } from './equipamento.service';

describe('EquipamentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EquipamentoService = TestBed.get(EquipamentoService);
    expect(service).toBeTruthy();
  });
});
