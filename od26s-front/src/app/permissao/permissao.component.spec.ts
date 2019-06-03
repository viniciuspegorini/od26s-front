import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissaoService } from './permissao.component';

describe('PermissaoComponent', () => {
  let component: PermissaoService;
  let fixture: ComponentFixture<PermissaoService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissaoService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissaoService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
