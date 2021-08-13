import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceUnitComponent } from './invoice-unit.component';

describe('InvoiceUnitComponent', () => {
  let component: InvoiceUnitComponent;
  let fixture: ComponentFixture<InvoiceUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
