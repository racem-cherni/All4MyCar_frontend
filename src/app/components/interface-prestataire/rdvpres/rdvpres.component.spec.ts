import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvpresComponent } from './rdvpres.component';

describe('RdvpresComponent', () => {
  let component: RdvpresComponent;
  let fixture: ComponentFixture<RdvpresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdvpresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdvpresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
