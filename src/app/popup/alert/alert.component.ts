import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
    // document.body.style.overflow = 'hidden';
    document.body.style.display = 'block';
  }
  ngOnDestroy() {
    document.body.style.overflow = '';    
  }

  dismiss() {
    this.activeModal.dismiss('dismiss');
  }
}
