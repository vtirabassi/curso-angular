import { Component, OnInit, EventEmitter } from '@angular/core';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from '../menu-item/menu-item.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  menu: Observable<MenuItem[]>

  constructor(private restaurantsServices: RestaurantsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.menu = this.restaurantsServices.menuOfRestaurant(this.route.parent.snapshot.params['id'])
  }

  addMenuItem(item: MenuItem){
    console.log(item)
  }

}
