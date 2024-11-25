import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHealthGoalComponent } from './add-health-goal.component';

describe('AddHealthGoalComponent', () => {
  let component: AddHealthGoalComponent;
  let fixture: ComponentFixture<AddHealthGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHealthGoalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHealthGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
