import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TendanceComponent } from './tendance.component';

describe('TendanceComponent', () => {
  let component: TendanceComponent;
  let fixture: ComponentFixture<TendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
