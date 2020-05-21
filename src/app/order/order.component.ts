import { Component, OnInit } from '@angular/core';
import { RadioOption } from 'app/shared/radio/rodio-option-model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import {Order, OrderItem} from  './order.model';
import { Router } from '@angular/router';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  order: Order

  delivery: number = 8

  radiosPaymentsOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão de Credito', value: 'CRE' },
    { label: 'Cartão Refeição', value: 'REF' }
  ]

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit() {
  }

  itensValue(){
    return this.orderService.itensValue()
  }

  cartItens() {
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

  sendOrder(order: Order){
    order.itens = this.cartItens()
    .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))

    this.orderService.sendOrder(order)
                      .subscribe((order: Order) => 
                                                  this.router.navigate(['/order-summary']))  

    this.orderService.clear()
  }

}
