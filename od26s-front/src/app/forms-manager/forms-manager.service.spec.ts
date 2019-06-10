import { TestBed } from '@angular/core/testing';

import { FormsManagerService } from './forms-manager.service';

describe('FormsManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormsManagerService = TestBed.get(FormsManagerService);
    expect(service).toBeTruthy();
  });
});
