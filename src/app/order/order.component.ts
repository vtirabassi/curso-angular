import { Component, OnInit } from '@angular/core';
import { RadioOption } from 'app/shared/radio/rodio-option-model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  radiosPaymentsOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão de Credito', value: 'CRE' },
    { label: 'Cartão Refeição', value: 'REF' }
  ]


  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  cartItens(){
    return this.orderService.cartItem()
  }

  increaseItem(item: CartItem) {
    this.orderService.increaseItem(item)
  }

  decreaseItem(item: CartItem) {
    this.orderService.decreaseItem(item)
  }

  removeItem(item: CartItem) {
    this.orderService.removeItem(item)
  }

}
