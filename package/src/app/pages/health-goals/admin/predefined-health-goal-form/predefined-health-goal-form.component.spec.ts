import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredefinedHealthGoalFormComponent } from './predefined-health-goal-form.component';

describe('PredefinedHealthGoalFormComponent', () => {
  let component: PredefinedHealthGoalFormComponent;
  let fixture: ComponentFixture<PredefinedHealthGoalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredefinedHealthGoalFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredefinedHealthGoalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
