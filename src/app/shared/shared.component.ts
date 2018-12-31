import { Component, OnInit } from '@angular/core';
import { FooterService } from './footer/footer.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {

  response: string;
  constructor(
    private footer: FooterService,
    private location: Location,
  ) {
    this.footer.$response.subscribe((data: string) => {
      console.log(data);
      this.response = data;
    })
  }

  ngOnInit() {
    
  }

  goBack() {
    this.location.back();
  }
  dd() {
    alert(this.response);
  }
}
