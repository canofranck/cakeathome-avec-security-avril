import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagerecetteComponent } from './imagerecette.component';

describe('ImagerecetteComponent', () => {
  let component: ImagerecetteComponent;
  let fixture: ComponentFixture<ImagerecetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagerecetteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagerecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
