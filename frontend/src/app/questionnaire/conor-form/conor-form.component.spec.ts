import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConorFormComponent } from './conor-form.component';

describe('ConorFormComponent', () => {
  let component: ConorFormComponent;
  let fixture: ComponentFixture<ConorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConorFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
