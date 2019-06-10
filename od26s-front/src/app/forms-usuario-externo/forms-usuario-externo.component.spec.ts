import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsUsuarioExternoComponent } from './forms-usuario-externo.component';

describe('FormsUsuarioExternoComponent', () => {
  let component: FormsUsuarioExternoComponent;
  let fixture: ComponentFixture<FormsUsuarioExternoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsUsuarioExternoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsUsuarioExternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
