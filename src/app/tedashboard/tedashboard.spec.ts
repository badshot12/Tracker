import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEDashboard } from './tedashboard';

describe('TEDashboard', () => {
  let component: TEDashboard;
  let fixture: ComponentFixture<TEDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TEDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TEDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
