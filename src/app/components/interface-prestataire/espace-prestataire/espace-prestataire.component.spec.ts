import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacePrestataireComponent } from './espace-prestataire.component';

describe('EspacePrestataireComponent', () => {
  let component: EspacePrestataireComponent;
  let fixture: ComponentFixture<EspacePrestataireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspacePrestataireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EspacePrestataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
