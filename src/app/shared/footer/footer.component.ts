import { Component, OnInit } from '@angular/core';
import { FooterService } from './footer.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  response: string;
  constructor(
    private footer: FooterService,
    private location: Location,
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.footer.doResponse(this.response);
    this.location.back();
  }
}
