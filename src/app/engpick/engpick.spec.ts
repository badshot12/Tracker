import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ENGPick } from './engpick';

describe('ENGPick', () => {
  let component: ENGPick;
  let fixture: ComponentFixture<ENGPick>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ENGPick]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ENGPick);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
