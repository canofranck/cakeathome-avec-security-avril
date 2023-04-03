import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastrecipesComponent } from './lastrecipes.component';

describe('LastrecipesComponent', () => {
  let component: LastrecipesComponent;
  let fixture: ComponentFixture<LastrecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastrecipesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastrecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
