import { Component, OnInit } from '@angular/core';
import { YunxinService } from './yunxin.service1';
import { Location } from '@angular/common';
// import * as Recorder  from './3rd/recorder';
// import { Recorder } from './3rd/recorder';
import Recorder  from './3rd/recorder';
// var Recorder = require('./3rd/recorder');

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

  response: string;
  historyMsgs = new Array();

  audioContext = Recorder.AudioContext;

  constructor(
    private yunxin: YunxinService,
    private location: Location,
  ) { }

  ngOnInit() {
    // this.yunxin.init(this.accid, this.token);
  }

  disconnect() {
    // this.yunxin.disconnect();
  }
  connect() {
    this.yunxin.init(this.accid, this.token);
    // this.yunxin.init({accid: this.accid, token: this.token});

    this.yunxin.setOnMsg((msg) => {
      this.onMsg(msg);
    });
    // if (this.yunxin.nim && this.yunxin.account.id === this.accid) {
    //   this.yunxin.connect();
    // } else {
    //   this.yunxin.init({});
    // }
    // this.yunxin.onmsg((msg) => {
    //   console.log(msg);
    // });
    // this.getHistoryMsgs();
  }
  record() {
    Recorder.mediaDevices.getUserMedia({
      audio: true
    }).then((stream) => {
      var input = this.audioContext.createMediaStreamSource(stream);
      var recorder = new Recorder(input);
      recorder.record();
      if (this.audioContext.state.indexOf('suspend')) {
        this.audioContext.resume().then(function () {
          recorder.record();
          console.log('audioContext suspend state resume');
        })
      } else {
        console.log('audioContext unsuspend state resume');
      }
    }).catch(function(err) {
      alert('您没有可用的麦克风输入设备')
      console.log(err);
      console.log('No live audio input: ' + err, err.name + ": " + err.message);
    });
  }
  onMsg(msg) {
    console.log('收到消息');
    console.log(msg);
    this.response = msg;
  }
  sendText() {
    this.yunxin.sendText({
      scene: 'p2p',
      to: this.toUserId,
      text: this.message,
      done: (error, msg) => {
        console.log(msg);
        // this.yunxin.cache.addMsgs(msg);
        // console.log(this.yunxin.cache);
        // this.response = this.yunxin.cache.sessions[0].lastMsg.text;
      }
    });
  }
  getHistoryMsgs() {
    // this.yunxin.getHistoryMsgs({
    //   scene: 'p2p',
    //   to: this.toUserId,
    //   reverse: false,
    //   asc: true,
    //   limit: 20,
    //   done: (error, obj) => {
    //     console.log(error);
    //     console.log(obj);
    //   }
    // })
  }
  goback() {
    this.location.back();
  }
  updateUnifo() {
    // this.yunxin.updateName('ss').subscribe(data=> {
    //   console.log(data);
    // })
  }
}
