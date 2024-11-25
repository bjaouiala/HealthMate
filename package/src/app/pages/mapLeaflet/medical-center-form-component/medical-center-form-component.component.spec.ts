import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalCenterFormComponentComponent } from './medical-center-form-component.component';

describe('MedicalCenterFormComponentComponent', () => {
  let component: MedicalCenterFormComponentComponent;
  let fixture: ComponentFixture<MedicalCenterFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalCenterFormComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalCenterFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
