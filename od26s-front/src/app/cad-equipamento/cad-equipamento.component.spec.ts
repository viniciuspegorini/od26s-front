import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadEquipamentoComponent } from './cad-equipamento.component';

describe('CadEquipamentoComponent', () => {
  let component: CadEquipamentoComponent;
  let fixture: ComponentFixture<CadEquipamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadEquipamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
