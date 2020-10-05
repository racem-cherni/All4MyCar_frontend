import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsadminComponent } from './clientsadmin.component';

describe('ClientsadminComponent', () => {
  let component: ClientsadminComponent;
  let fixture: ComponentFixture<ClientsadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
