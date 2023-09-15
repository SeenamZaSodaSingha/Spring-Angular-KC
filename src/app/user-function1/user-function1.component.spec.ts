import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFunction1Component } from './user-function1.component';

describe('UserFunction1Component', () => {
  let component: UserFunction1Component;
  let fixture: ComponentFixture<UserFunction1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFunction1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFunction1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
