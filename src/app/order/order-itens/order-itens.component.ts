import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';

@Component({
  selector: 'mt-order-itens',
  templateUrl: './order-itens.component.html'
})
export class OrderItensComponent implements OnInit {

  @Input() itens: CartItem[]

  @Output() increaseQt = new EventEmitter<CartItem>()
  @Output() decreaseQt = new EventEmitter<CartItem>()
  @Output() remove = new EventEmitter<CartItem>()

  constructor() { }

  ngOnInit() {
  }

  emitEventIncreaeQt(item: CartItem){
    this.increaseQt.emit(item)
  }

  emitEventDecreaeQt(item: CartItem){
    this.decreaseQt.emit(item)
  }

  emitEventRemove(item: CartItem){
    this.remove.emit(item)
  }
}
