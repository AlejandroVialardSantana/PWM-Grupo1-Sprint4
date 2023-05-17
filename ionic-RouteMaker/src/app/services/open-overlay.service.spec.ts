import { TestBed } from '@angular/core/testing';

import { OpenOverlayService } from './open-overlay.service';

describe('OpenOverlayService', () => {
  let service: OpenOverlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenOverlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
