import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardpresComponent } from './dashboardpres.component';

describe('DashboardpresComponent', () => {
  let component: DashboardpresComponent;
  let fixture: ComponentFixture<DashboardpresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardpresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardpresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
