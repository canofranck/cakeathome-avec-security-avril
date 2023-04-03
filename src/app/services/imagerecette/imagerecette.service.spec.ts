import { TestBed } from '@angular/core/testing';

import { ImagerecetteService } from './imagerecette.service';

describe('ImagerecetteService', () => {
  let service: ImagerecetteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagerecetteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
