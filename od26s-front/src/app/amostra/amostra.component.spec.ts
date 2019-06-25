import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmostraComponent } from './amostra.component';

describe('AmostraComponent', () => {
  let component: AmostraComponent;
  let fixture: ComponentFixture<AmostraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmostraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmostraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
