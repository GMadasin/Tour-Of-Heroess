import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerDetailComponent } from './power-detail.component';

describe('PowerDetailComponent', () => {
  let component: PowerDetailComponent;
  let fixture: ComponentFixture<PowerDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PowerDetailComponent]
    });
    fixture = TestBed.createComponent(PowerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
