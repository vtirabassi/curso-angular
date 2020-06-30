import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { MessageService } from "./shared/messages/message.service";
import { LoginService } from "./security/login/login.service";

@Injectable()
export class ApplicationErrorMessage extends ErrorHandler{

    constructor(private ns: MessageService, private injector: Injector, private zone: NgZone){
        super()
    }

    messageError(errorResponse: HttpErrorResponse | any){

        
        if(errorResponse instanceof HttpErrorResponse){
            console.log(errorResponse.status)
            this.zone.run(() => {
                switch(errorResponse.status){
                    case 401:
                        this.injector.get(LoginService).handleLogin()
                        break;
                    case 403:
                        this.ns.notify(errorResponse.error.message || 'Não autorizado.')
                        break;
                    case 404:
                        this.ns.notify(errorResponse.error.message || 'Recurso não encontrado.')
                        break;        
                }
            })
        } 

        super.handleError(errorResponse)
    }
}