import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecettesearchComponent } from './recettesearch.component';

describe('RecettesearchComponent', () => {
  let component: RecettesearchComponent;
  let fixture: ComponentFixture<RecettesearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecettesearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecettesearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
