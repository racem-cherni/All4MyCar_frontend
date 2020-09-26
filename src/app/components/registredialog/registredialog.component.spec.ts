import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistredialogComponent } from './registredialog.component';

describe('RegistredialogComponent', () => {
  let component: RegistredialogComponent;
  let fixture: ComponentFixture<RegistredialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistredialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistredialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
