import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFunction1Component } from './admin-function1.component';

describe('AdminFunction1Component', () => {
  let component: AdminFunction1Component;
  let fixture: ComponentFixture<AdminFunction1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFunction1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFunction1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
