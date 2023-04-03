import { TestBed } from '@angular/core/testing';

import { RecetteingredientService } from './recetteingredient.service';

describe('RecetteingredientService', () => {
  let service: RecetteingredientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecetteingredientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
