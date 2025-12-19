import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingReview } from './drawing-review';

describe('DrawingReview', () => {
  let component: DrawingReview;
  let fixture: ComponentFixture<DrawingReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawingReview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawingReview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
