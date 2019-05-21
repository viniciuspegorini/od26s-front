import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroModeloComponent } from './cadastro-modelo.component';

describe('CadastroModeloComponent', () => {
  let component: CadastroModeloComponent;
  let fixture: ComponentFixture<CadastroModeloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroModeloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
