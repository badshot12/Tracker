import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogDesign } from './backlog-design';

describe('BacklogDesign', () => {
  let component: BacklogDesign;
  let fixture: ComponentFixture<BacklogDesign>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BacklogDesign]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BacklogDesign);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
