import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

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
    private location: Location,
    private router: Router,
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
  goBack() {
    this.location.back();
    // this.router.navigate(['/admin']);
  }
}
