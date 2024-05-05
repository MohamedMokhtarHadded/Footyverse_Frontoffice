import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInjuriesComponent } from './view-injuries.component';

describe('ViewInjuriesComponent', () => {
  let component: ViewInjuriesComponent;
  let fixture: ComponentFixture<ViewInjuriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewInjuriesComponent]
    });
    fixture = TestBed.createComponent(ViewInjuriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
