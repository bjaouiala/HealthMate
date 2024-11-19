import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthGoalEditComponentComponent } from './health-goal-edit-component.component';

describe('HealthGoalEditComponentComponent', () => {
  let component: HealthGoalEditComponentComponent;
  let fixture: ComponentFixture<HealthGoalEditComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthGoalEditComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthGoalEditComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
