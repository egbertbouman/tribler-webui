import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustchainComponent } from './trustchain.component';

describe('TrustchainComponent', () => {
  let component: TrustchainComponent;
  let fixture: ComponentFixture<TrustchainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrustchainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustchainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
