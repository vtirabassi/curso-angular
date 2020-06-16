import { Restaurant } from "./restaurant/restaurant.model";
import { Injectable } from "@angular/core";
import { MEAT_API } from "app/app.api";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ErrorMessage } from "app/app.error-message";
import { MenuItem } from "app/restaurant-detail/menu-item/menu-item.model";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable()
export class RestaurantsService {

    constructor(private http: HttpClient){

    }

    restaurants(search?: string): Observable<Restaurant[]> {

        let params: HttpParams = undefined

        if(search){
            params = new HttpParams()
            params = params.set('q', search)
        }

        return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params: params})
    }

    restaurantById(id: string): Observable<Restaurant>{
        return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
    }

    reviewsOfRestaurant(id: string): Observable<any>{
        return this.http.get<any>(`${MEAT_API}/restaurants/${id}/reviews`)
    }

    menuOfRestaurant(id: string): Observable<MenuItem[]>{
        return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`)
    }
}