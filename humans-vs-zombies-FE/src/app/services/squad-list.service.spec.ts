import { TestBed } from '@angular/core/testing';

import { SquadListService } from './squad-list.service';

describe('SquadListService', () => {
  let service: SquadListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SquadListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
