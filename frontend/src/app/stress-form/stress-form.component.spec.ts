import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StressFormComponent } from './stress-form.component';

describe('StressFormComponent', () => {
  let component: StressFormComponent;
  let fixture: ComponentFixture<StressFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StressFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
