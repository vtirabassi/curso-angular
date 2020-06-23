import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { MessageService } from 'app/shared/messages/message.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  navigateTo: string

  constructor(private fb: FormBuilder, 
    private messageService: MessageService,
    private LoginService: LoginService,
    private activedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    })
    this.navigateTo = this.activedRoute.snapshot.params['to'] || '/'
  }

  login(){
    console.log(this.navigateTo)
    this.LoginService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(user => this.messageService.notify(`Bem vindo ${user.name}`), 
                response => this.messageService.notify(response.error.message),
                () => {
                  this.router.navigate([this.navigateTo])})
  }
}