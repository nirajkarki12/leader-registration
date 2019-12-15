import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpaidLeadersComponent } from './unpaid-leaders.component';

describe('UnpaidLeadersComponent', () => {
  let component: UnpaidLeadersComponent;
  let fixture: ComponentFixture<UnpaidLeadersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnpaidLeadersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnpaidLeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
