import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTComponent } from './calendar-t.component';

describe('CalendarTComponent', () => {
  let component: CalendarTComponent;
  let fixture: ComponentFixture<CalendarTComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarTComponent]
    });
    fixture = TestBed.createComponent(CalendarTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
