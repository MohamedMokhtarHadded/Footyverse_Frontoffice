import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderTrainingComponent } from './calender-training.component';

describe('CalenderTrainingComponent', () => {
  let component: CalenderTrainingComponent;
  let fixture: ComponentFixture<CalenderTrainingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalenderTrainingComponent]
    });
    fixture = TestBed.createComponent(CalenderTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
