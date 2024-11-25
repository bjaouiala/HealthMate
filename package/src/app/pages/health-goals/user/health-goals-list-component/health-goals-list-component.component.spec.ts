import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthGoalsListComponentComponent } from './health-goals-list-component.component';

describe('HealthGoalsListComponentComponent', () => {
  let component: HealthGoalsListComponentComponent;
  let fixture: ComponentFixture<HealthGoalsListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthGoalsListComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthGoalsListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
