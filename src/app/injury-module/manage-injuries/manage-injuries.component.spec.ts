import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInjuriesComponent } from './manage-injuries.component';

describe('ManageInjuriesComponent', () => {
  let component: ManageInjuriesComponent;
  let fixture: ComponentFixture<ManageInjuriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageInjuriesComponent]
    });
    fixture = TestBed.createComponent(ManageInjuriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
