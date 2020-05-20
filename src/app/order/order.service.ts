import { Injectable } from "@angular/core";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";

@Injectable()
export class OrderService{

    constructor(private cartService: ShoppingCartService){

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

}