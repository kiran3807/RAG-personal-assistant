import { TestBed } from '@angular/core/testing';

import { InternalStorageService } from './internal-storage.service';

describe('InternalStorageService', () => {
  let service: InternalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
