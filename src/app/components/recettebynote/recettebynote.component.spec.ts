import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecettebynoteComponent } from './recettebynote.component';

describe('RecettebynoteComponent', () => {
  let component: RecettebynoteComponent;
  let fixture: ComponentFixture<RecettebynoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecettebynoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecettebynoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
