import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredefinedHealthGoalListComponent } from './predefined-health-goal-list.component';

describe('PredefinedHealthGoalListComponent', () => {
  let component: PredefinedHealthGoalListComponent;
  let fixture: ComponentFixture<PredefinedHealthGoalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredefinedHealthGoalListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredefinedHealthGoalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
