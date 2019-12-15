import { TestBed } from '@angular/core/testing';

import { LeaderDataResolverService } from './leader-data-resolver.service';

describe('LeaderDataResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeaderDataResolverService = TestBed.get(LeaderDataResolverService);
    expect(service).toBeTruthy();
  });
});
