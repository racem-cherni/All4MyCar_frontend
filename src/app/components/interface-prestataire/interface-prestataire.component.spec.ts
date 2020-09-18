import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfacePrestataireComponent } from './interface-prestataire.component';

describe('InterfacePrestataireComponent', () => {
  let component: InterfacePrestataireComponent;
  let fixture: ComponentFixture<InterfacePrestataireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterfacePrestataireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfacePrestataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
