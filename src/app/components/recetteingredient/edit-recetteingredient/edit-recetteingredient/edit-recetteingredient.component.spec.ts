import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecetteingredientComponent } from './edit-recetteingredient.component';

describe('EditRecetteingredientComponent', () => {
  let component: EditRecetteingredientComponent;
  let fixture: ComponentFixture<EditRecetteingredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRecetteingredientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRecetteingredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
