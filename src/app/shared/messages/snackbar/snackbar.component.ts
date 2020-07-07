import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MessageService } from '../message.service';
import { Observable, timer } from 'rxjs';
import {tap, switchMap} from 'rxjs/operators'


@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: '0px'
      })),
      state('visible', style({  
        opacity: 1,
        bottom: '30px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ]) 
  ]
})
export class SnackbarComponent implements OnInit {

  @Input() message: string
  snackvisibility: string = "hidden"

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.notifier
    .pipe(
      tap(msg => {
        this.message = msg
        this.snackvisibility = 'visible'
      }), 
      switchMap(message => timer(3000)),
    ).subscribe(timer => this.snackvisibility = 'hidden')
  }

}
