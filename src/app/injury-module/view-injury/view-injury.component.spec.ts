import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInjuryComponent } from './view-injury.component';

describe('ViewInjuryComponent', () => {
  let component: ViewInjuryComponent;
  let fixture: ComponentFixture<ViewInjuryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewInjuryComponent]
    });
    fixture = TestBed.createComponent(ViewInjuryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
