import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolNumberGen } from './tool-number-gen';

describe('ToolNumberGen', () => {
  let component: ToolNumberGen;
  let fixture: ComponentFixture<ToolNumberGen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolNumberGen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolNumberGen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
