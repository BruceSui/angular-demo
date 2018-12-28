import { Component, OnInit } from '@angular/core';
import { YunxinService } from './yunxin.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-im',
  templateUrl: './im.component.html',
  styleUrls: ['./im.component.scss']
})
export class ImComponent implements OnInit {

  accid: string;
  token: string;
  toUserId: string;
  message: string;
  constructor(
    private yunxin: YunxinService,
    private location: Location,
  ) { }

  ngOnInit() {
  }

  disconnect() {
    this.yunxin.disconnect();
  }
  connect() {
    if (this.yunxin.nim && this.yunxin.accid === this.accid) {
      this.yunxin.connect();
    } else {
      this.yunxin.init(this.accid, this.token);
    }
    this.yunxin.onmsg((msg) => {
      console.log(msg);
    });
    // this.getHistoryMsgs();
  }
  onMsg() {
    this.yunxin.sendText({
      scene: 'p2p',
      to: this.toUserId,
      text: this.message,
      done: (error, msg) => {
        console.log(msg);
      }
    });
  }
  getHistoryMsgs() {
    this.yunxin.getHistoryMsgs({
      scene: 'p2p',
      to: this.toUserId,
      reverse: false,
      asc: true,
      limit: 20,
      done: (error, obj) => {
        console.log(error);
        console.log(obj);
      }
    })
  }
  goback() {
    this.location.back();
  }
  updateUnifo() {
    this.yunxin.updateUnifo().subscribe(data=> {
      console.log(data);
    })
  }
}
