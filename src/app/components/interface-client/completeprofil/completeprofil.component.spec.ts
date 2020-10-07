import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteprofilComponent } from './completeprofil.component';

describe('CompleteprofilComponent', () => {
  let component: CompleteprofilComponent;
  let fixture: ComponentFixture<CompleteprofilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteprofilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteprofilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
