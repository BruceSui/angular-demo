import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../popup/alert/alert.component';
import { YunxinService } from '../im/yunxin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  name: string;
  constructor(
    private router: Router,
    private modal: NgbModal,
    private yunxin: YunxinService,
    private el: ElementRef,
  ) { }

  ngOnInit() {
    console.log(this.router.url);
    window.scrollTo(0,0);
  }

  popup() {
    this.modal.open(AlertComponent).result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log(reason);
    });
  }
  
  goTo(location: string): void {
    window.location.hash = ''; 
    window.location.hash = location;
  }
}
