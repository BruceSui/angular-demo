import { Component, OnInit } from '@angular/core';

export const cookie = {
  set: function(key, val) {
      var date = new Date();
      var expiresHours = 9;
      date.setTime(date.getTime() + expiresHours * 3600 * 1000);
      console.log(date);
      document.cookie = key + '=' + val + ';expires=' + date + ';path=/';
  },
  get: function(key) {
      var getCookie = document.cookie.replace(/[ ]/g, '');
      var arrCookie = getCookie.split(';');
      var tips;
      for (var i = 0; i < arrCookie.length; i++) {
          var arr = arrCookie[i].split('=');
          if (key == arr[0]) {
              tips = arr[1];
              break;
          }
      }
      return tips;
  }
};

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
