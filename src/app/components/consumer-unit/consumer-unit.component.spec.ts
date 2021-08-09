import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerUnitComponent } from './consumer-unit.component';

describe('ConsumerUnitComponent', () => {
  let component: ConsumerUnitComponent;
  let fixture: ComponentFixture<ConsumerUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumerUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
