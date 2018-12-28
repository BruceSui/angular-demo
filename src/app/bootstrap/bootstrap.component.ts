import { Component, OnInit } from '@angular/core';
import BScroll from 'better-scroll';

@Component({
  selector: 'app-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.scss']
})
export class BootstrapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let wrapper = document.querySelector('.wrapper')
    let scroll = new BScroll(wrapper)
  }

}
