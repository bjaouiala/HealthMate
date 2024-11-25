import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPredefinedHealthGoalListComponent } from './user-predefined-health-goal-list.component';

describe('UserPredefinedHealthGoalListComponent', () => {
  let component: UserPredefinedHealthGoalListComponent;
  let fixture: ComponentFixture<UserPredefinedHealthGoalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPredefinedHealthGoalListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPredefinedHealthGoalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
