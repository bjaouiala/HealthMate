import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHealthIndicesComponent } from './list-health-indices.component';

describe('ListHealthIndicesComponent', () => {
  let component: ListHealthIndicesComponent;
  let fixture: ComponentFixture<ListHealthIndicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListHealthIndicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListHealthIndicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
