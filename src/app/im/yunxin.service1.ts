import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as Recorder  from './3rd/recorder';

import { Cache } from './js/cache';

import { SDKBridge } from './js/link';
import { Subject } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class YunxinService {

  private appKey = '9becfea0e0da17d58a4bb407a421b9dc';
  private appSecret = '5ada3b441617';
  private nonce = '12345';

  private unread = 0;
  private unreadSource = new Subject();
  unread$ = this.unreadSource.asObservable();
  yunxin: any;

  accid: any;
  token: any;
  cache: any;
  mysdk: any;
  firstLoadSysMsg: any;
  totalUnread: any;
  myNetcall: any;
  constructor(private http: HttpClient) {}

  init(accid, token) {
    console.log('init');
    // this.yunxin = new YX('dahu02', 'd38e8d098a3b29d7ac52dfe5185818fd');
    // console.log(this.yunxin.nim);

    this.accid = accid;
    this.token = token;
    // this.initModule();
    this.cache = new Cache();
    this.mysdk = new SDKBridge(this, this.cache);
    this.firstLoadSysMsg = true;
    this.totalUnread = 0;
    
  }
  connect() {
    // this.mysdk.connect();
  }
  onMsg() {
    console.log('收到消息');
  }
  sendText(param: { scene: string; to: string; text: string; done: any }) {
    // this.mysdk.sendTextMessage(param.scene, param.to, param.text, true, param.done);
    this.mysdk.sendText(param.scene, param.to, param.text, param.done);
  }
  setOnMsg(param) {
    this.mysdk.setOptions({
        onmsg: param
    });
  }
}
