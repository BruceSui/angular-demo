import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as SDK from './js//NIM_Web_SDK_v5.3.0';
import { CheckSumBuilder } from './js/sha1';
import { SHA2 } from './js/SHA1Util';
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
  account: any;
  cache = {
      // sessions: any;
      friendslist: new Array(),
      personlist: {},
      // 户订阅的事件同步
      personSubscribes: {},
      teamlist: new Array(),
      teamMembers: {},
      teamMap: {},
      msgs: {},
      sessions: new Array(),
      blacklist: new Array(),
      mutelist: new Array(),
      sysMsgs: new Array(),
      customSysMsgs: new Array(),
      sysMsgCount: 0
  };
  mysdk: any;

  nim: any;
  constructor(private http: HttpClient) {}

  init(account: any) {
      this.account = account;
      this.nim = SDK.NIM.getInstance({
          appKey: this.appKey,
          account: account.accid,
          token: account.token, // 'e9cd9ed5e0202dbbde9ac5cb47605cef',
          nick: account.nickName,
          avatar: account.imageUrl,
          // 连接
          onconnect: () => {
              this.onConnect();
          },
          ondisconnect: obj => {
              this.onDisconnect(obj);
          },
          onerror: error => {
              this.onError(error);
          },
          onwillreconnect: obj => {
              this.onWillReconnect(obj);
          },
          // 多端登录变化
          onloginportschange: loginPorts => {
              this.onLoginPortsChange(loginPorts);
          },
          //消息
          onmsg: msg => {
              this.onMsg(msg);
          },
          onroamingmsgs: msgs => {
              this.saveMsgs(msgs);
          },
          onofflinemsgs: msgs => {
              this.saveMsgs(msgs);
          },
          // onTeamMsgReceipt: onTeamMsgReceipt.bind(this),
          // 会话
          // 同步会话未读数
          syncSessionUnread: true,
          onsessions: sessions => {
              this.onSessions(sessions);
          },
          onupdatesession: sessions => {
              this.onUpdatesession(sessions);
          },
          // 同步完成
          onsyncdone: () => {
              this.onSyncDone();
          },
          //个人信息
          onmyinfo: data => {
              this.onMyInfo(data);
          },
          onupdatemyinfo: data => {
              this.onMyInfo(data);
          },
          //系统通知
          onsysmsg: (newMsg, msg) => {
              this.onSysMsg(newMsg, msg);
          },
          onofflinesysmsgs: sysMsgs => {
              this.onOfflineSysmsgs(sysMsgs);
          },
          onroamingsysmsgs: sysMsgs => {
              this.onRoamingSysmsgs(sysMsgs);
          },
          onupdatesysmsg: (newMsg, msg) => {
              this.onSysMsg(newMsg, msg);
          },
          oncustomsysmsg: msg => {
              this.onCustomSysMsg(msg);
          },
          onofflinecustomsysmsgs: msgs => {
              this.onOfflineCustomSysMsgs(msgs);
          },

          onsyncmarkinblacklist: param => {
              this.onSyncMarkinBlacklist(param);
          },
          onsyncmarkinmutelist: param => {
              this.onSyncMarkinMutelist(param);
          },
          // onsyncfriendaction: onSyncFriendAction.bind(this)

          // 监听订阅事件列表
          onpushevents: param => {
              this.onPushEvents(param);
          },
          syncRoamingMsgs: true,
          syncMsgReceipts: true
      });
  }
  private onConnect() {
      console.log(this.account.accid + '连接成功');
      console.log(this.account);
      this.updateName(this.account.nickName).subscribe(data => {
          console.log(data);
      });
      this.updateIcon(this.account.imageUrl).subscribe(data => {
          console.log(data);
      });
  }
  private onDisconnect(obj) {
      console.log(this.account.accid + '连接断开', obj);
  }
  private onWillReconnect(obj) {
      // 此时说明 `SDK` 已经断开连接，请开发者在界面上提示用户连接已断开，而且正在重新建立连接
      console.log('正在重新连接');
  }
  private onLoginPortsChange(loginPorts) {
      console.log('当前登录帐号在其它端的状态发生改变了', loginPorts);
      // this.controller.loginPorts(loginPorts);
  }
  private onError(error) {
      console.log('错误信息' + error);
  }
  private onMsg(msg) {
      //涉及UI太多放到main.js里去处理了
      console.log('收到------------tip');
      // this.controller.doMsg(msg);
  }
  private saveMsgs(msgs) {
      console.log('saveMsgs');
      console.log(msgs);
  }
  private onSessions(sessions) {
      console.log('收到会话列表', sessions);
      sessions.array.forEach(element => {
          this.unread += element.unread;
      });
      this.unreadSource.next(this.unread);
      this.cache.sessions = this.nim.mergeSessions(this.cache.sessions, sessions);
      // updateSessionsUI();
  }
  private onUpdatesession(session) {
      console.log('会话更新了', session);
      this.unread += session.unread;
      this.unreadSource.next(this.unread);
      this.cache.sessions = this.nim.mergeSessions(this.cache.sessions, session);
      // updateSessionsUI();
  }
  private onSyncDone() {
      console.log('消息同步完成');
  }
  private onMyInfo(data) {
      console.log('===onMyInfo===');
      console.log(data);
  }
  private onSysMsg(newMsg, msg) {
      console.log('===onsysmsg===');
      console.log(newMsg);
      console.log(msg);
  }
  private onCustomSysMsg(msg) {
      console.log('收到------------自定义通知', msg);
  }
  private onOfflineCustomSysMsgs(msgs) {
      console.log('离线推送消息');
      console.log(msgs);
  }
  private onOfflineSysmsgs(sysMsgs) {
      console.log('onOfflineSysmsgs====');
      console.log(sysMsgs);
  }
  private onRoamingSysmsgs(sysMsgs) {
      console.log('onRoamingSysmsgs====');
      console.log(sysMsgs);
  }
  private onSyncMarkinBlacklist(param) {
      console.log('onSyncMarkinBlacklist====');
      console.log(param);
  }
  private onSyncMarkinMutelist(param) {
      console.log('onSyncMarkinMutelist====');
      console.log(param);
  }
  private onPushEvents(param) {
      console.log('订阅的事件');
  }
  connect() {
      this.nim.connect();
  }
  disconnect() {
      this.nim.disconnect();
  }
  setOptions(param) {
      this.nim.setOptions(param);
  }
  onmsg(any) {
      this.nim.setOptions({
          onmsg: any
      });
  }
  sendText(param: { scene: string; to: string; text: string; done: any }) {
      this.nim.sendText(param);
  }
  sendFile(param) {
      this.nim.sendFile(param);
  }
  getHistoryMsgs(param) {
      this.nim.getHistoryMsgs(param);
  }
  updateName(name) {
      console.log('设置用户昵称' + name);
      const curTime = parseInt(new Date().getTime() / 1000 + '');
      const checkSum = SHA2(this.appSecret + this.nonce + curTime);
      const url = 'https://api.netease.im/nimserver/user/updateUinfo.action';
      return this.http.post(
          url,
          {},
          {
              headers: new HttpHeaders({
                  AppKey: this.appKey,
                  Nonce: this.nonce,
                  CurTime: curTime + '',
                  CheckSum: checkSum,
                  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
              }),
              params: {
                  accid: this.account.accid,
                  name: name
              }
          }
      );
  }
  updateIcon(icon) {
      console.log('设置用户头像' + icon);
      const curTime = parseInt(new Date().getTime() / 1000 + '');
      const checkSum = SHA2(this.appSecret + this.nonce + curTime);
      const url = 'https://api.netease.im/nimserver/user/updateUinfo.action';
      return this.http.post(
          url,
          {},
          {
              headers: new HttpHeaders({
                  AppKey: this.appKey,
                  Nonce: this.nonce,
                  CurTime: curTime + '',
                  CheckSum: checkSum,
                  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
              }),
              params: {
                  accid: this.account.accid,
                  icon: icon
              }
          }
      );
  }
}
