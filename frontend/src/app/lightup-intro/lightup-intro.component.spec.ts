import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightupIntroComponent } from './lightup-intro.component';

describe('IntroComponent', () => {
  let component: LightupIntroComponent;
  let fixture: ComponentFixture<LightupIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LightupIntroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LightupIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
