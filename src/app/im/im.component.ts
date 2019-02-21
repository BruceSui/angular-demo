import { Component, OnInit } from '@angular/core';
import { YunxinService } from './yunxin.service1';
import { Location } from '@angular/common';
// import * as Recorder  from './3rd/recorder';
// import { Recorder } from './3rd/recorder';
import Recorder  from './3rd/recorder';
// var Recorder = require('./3rd/recorder');
import { YX }  from './js/base';

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
  yx: any;

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
    // this.yunxin.init(this.accid, this.token);
    // this.yunxin.init({accid: this.accid, token: this.token});

    // this.yunxin.setOnMsg((msg) => {
    //   this.onMsg(msg);
    // });


    this.yx = new YX(this.accid, this.token);
  }
  recordAudio() {
    var self = this
    this.audioContext = new AudioContext();
    console.log(this.audioContext);
    

    navigator.mediaDevices.getUserMedia({
      audio: true
    }).then(stream => {
      var input = self.audioContext.createMediaStreamSource(stream);
      YX.fn.recorder = new Recorder(input);
      YX.fn.recorder.record();
      if (~self.audioContext.state.indexOf('suspend')) {
        self.audioContext.resume().then(function () {
          YX.fn.recorder.record();
          // self.showRecorderTime()
          console.log('audioContext suspend state resume');
        })
      } else {
        // self.showRecorderTime()
      }
      console.log('audioContext suspend state resume');
    }).catch(function(err) {
      alert('您没有可用的麦克风输入设备')
      // self.$toRecord.addClass('disabled')
      console.log('No live audio input: ' + err, err.name + ": " + err.message);
    });
  }
  cancelRecordAudio() {
    YX.fn.recorder.stop();
    YX.fn.recorder.clear();
    YX.fn.recordTime = 0
  }
  sendRecordAudio() {
    const self = this.yx;
    YX.fn.recorder.exportWAV((blob) => {
      // self.$toRecord.addClass('uploading');
      self.sendRecordAudio({
        scene: 'p2p',
        // to: self.crtSessionAccount,
        to: this.toUserId,
        type: 'audio',
        blob: blob,
        uploadprogress: function(obj) {
          console.log('文件总大小: ' + obj.total + 'bytes');
          console.log('已经上传的大小: ' + obj.loaded + 'bytes');
          console.log('上传进度: ' + obj.percentage);
          console.log('上传进度文本: ' + obj.percentageText);
          if (obj.percentage === 100) {
            // self.$toRecord.removeClass('uploading');
            // self.$toRecord.removeClass('recorded');
          }
        },
        done: () => {
          console.log('done');
          this.cancelRecordAudio();          
        }
      });
    });
    this.cancelRecordAudio();
  }
  


  onMsg(msg) {
    console.log('收到消息');
    console.log(msg);
    this.response = msg;
  }
  sendText() {
    this.yx.sendText({
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
