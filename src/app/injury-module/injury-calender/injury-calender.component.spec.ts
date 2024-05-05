import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InjuryCalenderComponent } from './injury-calender.component';

describe('InjuryCalenderComponent', () => {
  let component: InjuryCalenderComponent;
  let fixture: ComponentFixture<InjuryCalenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InjuryCalenderComponent]
    });
    fixture = TestBed.createComponent(InjuryCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
