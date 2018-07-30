import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveformSignupComponent } from './reactiveform-signup.component';

describe('ReactiveformSignupComponent', () => {
  let component: ReactiveformSignupComponent;
  let fixture: ComponentFixture<ReactiveformSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactiveformSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveformSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
