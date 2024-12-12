import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawTableComponent } from './raw-table.component';

describe('RawTableComponent', () => {
  let component: RawTableComponent;
  let fixture: ComponentFixture<RawTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
