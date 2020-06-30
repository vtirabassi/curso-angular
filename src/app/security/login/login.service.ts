import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { MEAT_API } from "app/app.api";
import { User } from "./user.model";
import { Router, NavigationEnd } from "@angular/router";

import 'rxjs/add/operator/filter'

@Injectable()
export class LoginService{

    user: User
    path: string

    constructor(private http: HttpClient, 
        private router: Router){

            this.router.events.filter(e => e instanceof NavigationEnd)
            .subscribe((e: NavigationEnd) => this.path = e.url)
    }


    isLoggedIn() : boolean {
        return this.user !== undefined
    }


    login(email: string, password: string): Observable<User> {
        return this.http.post<User>(`${MEAT_API}/login`, {email: email, password: password})
        .do(user => this.user = user)
    }

    handleLogin(path: string = this.path){
        this.router.navigate(['/login', btoa(path)])
    }

    logout(){
        this.user = undefined
    }
}