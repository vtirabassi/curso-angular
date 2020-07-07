import { Injectable } from "@angular/core";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { Order } from "./order.model";
import { Observable } from "rxjs";
import { MEAT_API } from "app/app.api";
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable()
export class OrderService{

    constructor(private cartService: ShoppingCartService,
        private http: HttpClient){

    }

    itensValue(){
        return this.cartService.total()
    }

    cartItem(){
        return this.cartService.itens
    }

    increaseItem(item: CartItem){
        this.cartService.increaseItem(item)
    }

    decreaseItem(item: CartItem){
        this.cartService.decreaseItem(item)
    }

    removeItem(item: CartItem){
        this.cartService.removeItem(item)
    }

    sendOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(`${MEAT_API}/orders`, order)
    }

    clear(){
        this.cartService.clearCart()
    }

}