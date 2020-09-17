import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationpresComponent } from './navigationpres.component';

describe('NavigationpresComponent', () => {
  let component: NavigationpresComponent;
  let fixture: ComponentFixture<NavigationpresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationpresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationpresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
