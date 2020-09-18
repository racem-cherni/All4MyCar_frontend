import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceClientComponent } from './interface-client.component';

describe('InterfaceClientComponent', () => {
  let component: InterfaceClientComponent;
  let fixture: ComponentFixture<InterfaceClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterfaceClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfaceClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
