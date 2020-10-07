import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteprofilpresComponent } from './completeprofilpres.component';

describe('CompleteprofilpresComponent', () => {
  let component: CompleteprofilpresComponent;
  let fixture: ComponentFixture<CompleteprofilpresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteprofilpresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteprofilpresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
