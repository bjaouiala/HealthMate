import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAssessmentResultComponent } from './risk-assessment-result.component';

describe('RiskAssessmentResultComponent', () => {
  let component: RiskAssessmentResultComponent;
  let fixture: ComponentFixture<RiskAssessmentResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiskAssessmentResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskAssessmentResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
