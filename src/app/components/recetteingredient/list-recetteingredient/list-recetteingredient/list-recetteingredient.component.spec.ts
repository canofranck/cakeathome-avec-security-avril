import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecetteingredientComponent } from './list-recetteingredient.component';

describe('ListRecetteingredientComponent', () => {
  let component: ListRecetteingredientComponent;
  let fixture: ComponentFixture<ListRecetteingredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRecetteingredientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRecetteingredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
