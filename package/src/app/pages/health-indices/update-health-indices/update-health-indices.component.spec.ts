import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHealthIndicesComponent } from './update-health-indices.component';

describe('UpdateHealthIndicesComponent', () => {
  let component: UpdateHealthIndicesComponent;
  let fixture: ComponentFixture<UpdateHealthIndicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateHealthIndicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateHealthIndicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
