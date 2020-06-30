import { EventEmitter } from "@angular/core";

export class MessageService{
    
    notifier = new EventEmitter<string>()
    
    notify(message: string){
        this.notifier.emit(message)
    }
}