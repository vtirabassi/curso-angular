import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { MessageService } from 'app/shared/messages/message.service';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private fb: FormBuilder, 
    private messageService: MessageService,
    private LoginService: LoginService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    })
  }

  login(){
    this.LoginService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(user => this.messageService.notify(`Bem vindo ${user.name}`), 
                response => this.messageService.notify(response.error.message))
  }
}