import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestComplete } from './request-complete';

describe('RequestComplete', () => {
  let component: RequestComplete;
  let fixture: ComponentFixture<RequestComplete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestComplete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestComplete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
