import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolHistory } from './tool-history';

describe('ToolHistory', () => {
  let component: ToolHistory;
  let fixture: ComponentFixture<ToolHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
