import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogvehiculeComponent } from './dialogvehicule.component';

describe('DialogvehiculeComponent', () => {
  let component: DialogvehiculeComponent;
  let fixture: ComponentFixture<DialogvehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogvehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogvehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
