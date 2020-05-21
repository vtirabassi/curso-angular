import { Injectable } from "@angular/core";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { Order } from "./order.model";
import { Observable } from "rxjs/Observable";
import { Http, RequestOptions, Headers } from "@angular/http";
import { MEAT_API } from "app/app.api";

@Injectable()
export class OrderService{

    constructor(private cartService: ShoppingCartService, private http: Http){

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
        const headers = new Headers()
        headers.append('Contente-Type', 'application/json')
        return this.http.post(`${MEAT_API}/orders`, 
                                JSON.stringify(order), 
                                new RequestOptions({headers}))
                                .map(resp => resp.json())

    }

    clear(){
        this.cartService.clearCart()
    }

}