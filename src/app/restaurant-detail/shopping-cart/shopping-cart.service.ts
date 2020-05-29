import { CartItem } from "./cart-item.model";
import { MenuItem } from "../menu-item/menu-item.model";
import { ChangeDetectorRef, Injectable } from "@angular/core";
import { MessageService } from "app/shared/messages/message.service";

@Injectable()
export class ShoppingCartService{

    itens: CartItem[] = []

    constructor(private messageService: MessageService){

    }

    clearCart(){
        console.log(this.itens)
        this.itens = []
    }

    addItem(item: MenuItem){
        let foundItem = this.itens.find(cart => item.id === cart.menuItem.id)
        if(foundItem){
            this.increaseItem(foundItem)
        }else{
            this.itens.push(new CartItem(item))
        }

        this.messageService.notify(`Você adicionou ${item.name} no carrinho`)
    }

    increaseItem(item: CartItem){
        item.quantity += 1
    }

    decreaseItem(item: CartItem){
        item.quantity -= 1
        if(item.quantity === 0){
            this.removeItem(item)
        }
    }

    removeItem(item: CartItem){
        this.itens.splice(this.itens.indexOf(item), 1)

        this.messageService.notify(`Você removeu ${item.menuItem.name} do carrinho`)
    }

    total(): number {

        return this.itens.map(i => i.value())
        .reduce((prev, value) => prev + value, 0)
    }
}