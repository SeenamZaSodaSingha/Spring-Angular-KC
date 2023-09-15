import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicFunction1Component } from './public-function1.component';

describe('PublicFunction1Component', () => {
  let component: PublicFunction1Component;
  let fixture: ComponentFixture<PublicFunction1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicFunction1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicFunction1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
