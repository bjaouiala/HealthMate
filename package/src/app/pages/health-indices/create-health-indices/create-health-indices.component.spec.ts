import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHealthIndicesComponent } from './create-health-indices.component';

describe('CreateHealthIndicesComponent', () => {
  let component: CreateHealthIndicesComponent;
  let fixture: ComponentFixture<CreateHealthIndicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateHealthIndicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHealthIndicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
