import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInjuryComponent } from './edit-injury.component';

describe('EditInjuryComponent', () => {
  let component: EditInjuryComponent;
  let fixture: ComponentFixture<EditInjuryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditInjuryComponent]
    });
    fixture = TestBed.createComponent(EditInjuryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
