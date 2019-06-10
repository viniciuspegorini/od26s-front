import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsManagerComponent } from './forms-manager.component';

describe('FormsManagerComponent', () => {
  let component: FormsManagerComponent;
  let fixture: ComponentFixture<FormsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
