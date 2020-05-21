import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { CartItem } from './cart-item.model';
import { MenuItem } from '../menu-item/menu-item.model';
import {  ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {

  constructor(private shoppingService: ShoppingCartService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.cdr.detectChanges();
  }

  itens(): any[] {
    return this.shoppingService.itens
  }

  total(): number {
    return this.shoppingService.total()
  }

  removeItem(item: CartItem){
    this.shoppingService.removeItem(item)
    this.cdr.detectChanges();
  }

  clear(){
    this.shoppingService.clearCart()
  }

  addItem(item: MenuItem){
    this.shoppingService.addItem(item)
    this.cdr.detectChanges();
  }
}
