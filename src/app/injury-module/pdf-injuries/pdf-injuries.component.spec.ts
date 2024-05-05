import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfInjuriesComponent } from './pdf-injuries.component';

describe('PdfInjuriesComponent', () => {
  let component: PdfInjuriesComponent;
  let fixture: ComponentFixture<PdfInjuriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfInjuriesComponent]
    });
    fixture = TestBed.createComponent(PdfInjuriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
