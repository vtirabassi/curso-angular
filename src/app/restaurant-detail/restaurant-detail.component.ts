import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'app/restaurants/restaurant/restaurant.model';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit {

  restaurant: Restaurant

  constructor(private restaurantsServices: RestaurantsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.restaurantsServices.restaurantById(this.route.snapshot.params['id'])
    .subscribe(resp => this.restaurant = resp)
  }

}
