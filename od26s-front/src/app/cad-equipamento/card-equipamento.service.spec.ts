import { TestBed } from '@angular/core/testing';

import { CardEquipamentoService } from './card-equipamento.service';

describe('CardEquipamentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardEquipamentoService = TestBed.get(CardEquipamentoService);
    expect(service).toBeTruthy();
  });
});
