import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-app';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      // console.log(event);
      if (event instanceof NavigationEnd) {
          // this.router;
          console.log(this.router.url);
      }
  });
  }
}
