import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetteingredientComponent } from './recetteingredient.component';

describe('RecetteingredientComponent', () => {
  let component: RecetteingredientComponent;
  let fixture: ComponentFixture<RecetteingredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecetteingredientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecetteingredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
