import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthStatsChartComponent } from './health-stats-chart.component';

describe('HealthStatsChartComponent', () => {
  let component: HealthStatsChartComponent;
  let fixture: ComponentFixture<HealthStatsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthStatsChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthStatsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
