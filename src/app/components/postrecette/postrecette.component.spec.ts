import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostrecetteComponent } from './postrecette.component';

describe('PostrecetteComponent', () => {
  let component: PostrecetteComponent;
  let fixture: ComponentFixture<PostrecetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostrecetteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostrecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
