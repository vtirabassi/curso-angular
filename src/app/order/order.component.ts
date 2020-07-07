import { Component, OnInit } from '@angular/core';
import { RadioOption } from 'app/shared/radio/rodio-option-model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import {Order, OrderItem} from  './order.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import  {tap} from 'rxjs/operators'

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  numberRegex = /^[0-9]*$/

  orderForm: FormGroup

  order: Order

  delivery: number = 8

  orderId: string

  radiosPaymentsOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão de Credito', value: 'CRE' },
    { label: 'Cartão Refeição', value: 'REF' }
  ]

  constructor(private orderService: OrderService, 
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.fb.group({
      name: new FormControl('', {validators: [Validators.required, Validators.minLength(5)], updateOn: 'blur'}),
      email: this.fb.control('', [Validators.required, Validators.pattern(this.emailRegex)]),
      emailConfirm: this.fb.control('', [Validators.required, Validators.pattern(this.emailRegex)]),
      address: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      number: this.fb.control('', [Validators.required, Validators.pattern(this.numberRegex)]),
      optionalAddress: this.fb.control(''),
      paymentOption: this.fb.control('', [Validators.required])
    }, {validator: OrderComponent.equalsEmail})
  }

  static equalsEmail(group: AbstractControl): {[key: string]: boolean}{
    const email = group.get('email')
    const emailConfirm = group.get('emailConfirm')
    if(!email || !emailConfirm){
      return undefined
    }

    if(email.value !== emailConfirm.value){
       return {emailNotMatch: true} 
    }

    return undefined
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
                      .pipe(
                      tap((order: Order) => {this.orderId = order.id}))
                      .subscribe((order: Order) => {
                        this.router.navigate(['/order-summary'])
                        this.orderService.clear()
                      })  

    console.log(order)                                                
  }

  isOrderCompleted():boolean{
    return this.orderId !== undefined
  }

}
