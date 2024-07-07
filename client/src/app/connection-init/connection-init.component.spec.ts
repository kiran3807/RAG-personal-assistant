import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionInitComponent } from './connection-init.component';

describe('ConnectionInitComponent', () => {
  let component: ConnectionInitComponent;
  let fixture: ComponentFixture<ConnectionInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectionInitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectionInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
