import { Component, OnInit } from '@angular/core';

import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './restaurant/restaurant.model';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { Observable, from } from 'rxjs';
import {switchMap, distinctUntilChanged, catchError, tap, debounceTime} from 'rxjs/operators' 


@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations:[
    trigger('toggleSearch', [
      state('hidden', style({opacity: 0, "max-height": "0px"})),
      state('visible', style({opacity: 1, "max-height": "70px", "margin-top": "20px"})),
      transition('* => *', animate('250ms 0s ease-in-out')
      )
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden'

  restaurants: Restaurant[]
  
  searchForm: FormGroup
  searchControl: FormControl

  constructor(private restaurantsServices: RestaurantsService, private fb: FormBuilder) { }

  ngOnInit() {

    this.searchControl = this.fb.control('')

    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(searchDigit => 
        this.restaurantsServices.restaurants(searchDigit).pipe( 
        catchError(error => from([]))))
        ).subscribe(rest => this.restaurants = rest)

    this.restaurantsServices.restaurants()
      .subscribe(rest => this.restaurants = rest)
  }

  toggleSearch(){
    this.searchBarState = this.searchBarState ===  'hidden'
                          ? 'visible' 
                          : 'hidden'
  }

}
