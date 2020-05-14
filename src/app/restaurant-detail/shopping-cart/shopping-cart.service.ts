import { CartItem } from "./cart-item.model";
import { MenuItem } from "../menu-item/menu-item.model";
import { ChangeDetectorRef } from "@angular/core";

export class ShoppingCartService{

    itens: CartItem[] = []

    clearCart(){
        console.log(this.itens)
        this.itens = []
    }

    addItem(item: MenuItem){
        let foundItem = this.itens.find(cart => item.id === cart.menuItem.id)
        if(foundItem){
            foundItem.quantity += 1
        }else{
            this.itens.push(new CartItem(item))
        }
    }

    removeItem(item: CartItem){
        this.itens.splice(this.itens.indexOf(item), 1)
    }

    total(): number {

        return this.itens.map(i => i.value())
        .reduce((prev, value) => prev + value, 0)
    }
}