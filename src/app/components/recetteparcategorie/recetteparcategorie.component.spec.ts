import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetteparcategorieComponent } from './recetteparcategorie.component';

describe('RecetteparcategorieComponent', () => {
  let component: RecetteparcategorieComponent;
  let fixture: ComponentFixture<RecetteparcategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecetteparcategorieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecetteparcategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
