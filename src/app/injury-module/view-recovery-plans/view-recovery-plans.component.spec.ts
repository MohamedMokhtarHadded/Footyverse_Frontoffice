import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecoveryPlansComponent } from './view-recovery-plans.component';

describe('ViewRecoveryPlansComponent', () => {
  let component: ViewRecoveryPlansComponent;
  let fixture: ComponentFixture<ViewRecoveryPlansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewRecoveryPlansComponent]
    });
    fixture = TestBed.createComponent(ViewRecoveryPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
