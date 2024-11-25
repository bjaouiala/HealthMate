import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctoremailComponent } from './doctoremail.component';

describe('DoctoremailComponent', () => {
  let component: DoctoremailComponent;
  let fixture: ComponentFixture<DoctoremailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctoremailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctoremailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
