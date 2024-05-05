import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInjuryComponent } from './add-injury.component';

describe('AddInjuryComponent', () => {
  let component: AddInjuryComponent;
  let fixture: ComponentFixture<AddInjuryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInjuryComponent]
    });
    fixture = TestBed.createComponent(AddInjuryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
