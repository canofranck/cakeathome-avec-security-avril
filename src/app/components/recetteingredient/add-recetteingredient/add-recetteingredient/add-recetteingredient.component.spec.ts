import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecetteingredientComponent } from './add-recetteingredient.component';

describe('AddRecetteingredientComponent', () => {
  let component: AddRecetteingredientComponent;
  let fixture: ComponentFixture<AddRecetteingredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecetteingredientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRecetteingredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
