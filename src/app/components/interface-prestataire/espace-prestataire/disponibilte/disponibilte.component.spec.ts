import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibilteComponent } from './disponibilte.component';

describe('DisponibilteComponent', () => {
  let component: DisponibilteComponent;
  let fixture: ComponentFixture<DisponibilteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisponibilteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisponibilteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
