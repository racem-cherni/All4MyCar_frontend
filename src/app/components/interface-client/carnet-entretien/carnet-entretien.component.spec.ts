import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarnetEntretienComponent } from './carnet-entretien.component';

describe('CarnetEntretienComponent', () => {
  let component: CarnetEntretienComponent;
  let fixture: ComponentFixture<CarnetEntretienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarnetEntretienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarnetEntretienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
