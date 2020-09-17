import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilpresComponent } from './profilpres.component';

describe('ProfilpresComponent', () => {
  let component: ProfilpresComponent;
  let fixture: ComponentFixture<ProfilpresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilpresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilpresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
