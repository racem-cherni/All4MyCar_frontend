import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteprofilfromComponent } from './completeprofilfrom.component';

describe('CompleteprofilfromComponent', () => {
  let component: CompleteprofilfromComponent;
  let fixture: ComponentFixture<CompleteprofilfromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteprofilfromComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteprofilfromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
