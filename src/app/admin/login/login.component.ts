import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  constructor(
    private service: LoginService,
  ) { }

  ngOnInit() {
  }

  login() {
    this.service.login({username: this.username, password: this.password, rememberMe: true}).subscribe(data => {
      console.log(data);
    });
  }
  get() {
    this.service.get().subscribe(data => {
      console.log(data);
    });
  }
  logout() {
    console.log(document.cookie);
  }
}
