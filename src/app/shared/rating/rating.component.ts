import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mt-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit {

  @Output() rated = new EventEmitter<number>()

  isDisabled: boolean = false

  rates: number[] = [1,2,3,4,5]

  rate: number = 0

  constructor() { }

  ngOnInit() {
  }

  setRate(rate: number){
    this.rate = rate
    if(!this.rated.isStopped){
      this.rated.emit(rate)  
    }

    this.rated.isStopped = true
  }

  setTemporaryRate(rate: number){
    this.rate = rate
  }

  clear(){
    this.rate = this.rate
  }

}
