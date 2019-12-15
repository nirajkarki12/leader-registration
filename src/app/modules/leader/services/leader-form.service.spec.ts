import { TestBed } from '@angular/core/testing';

import { LeaderFormService } from './leader-form.service';

describe('LeaderFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeaderFormService = TestBed.get(LeaderFormService);
    expect(service).toBeTruthy();
  });
});
