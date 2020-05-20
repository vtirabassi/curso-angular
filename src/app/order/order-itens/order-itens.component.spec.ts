import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItensComponent } from './order-itens.component';

describe('OrderItensComponent', () => {
  let component: OrderItensComponent;
  let fixture: ComponentFixture<OrderItensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderItensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
