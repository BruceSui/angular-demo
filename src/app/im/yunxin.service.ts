import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as SDK from './js//NIM_Web_SDK_v5.3.0';
import { CheckSumBuilder } from './js/sha1';
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

  token: string;
  accid: string;
  nickName: string;
  imageUrl: string;
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
    sysMsgCount: 0,
  };
  mysdk: any;

  nim: any;
  constructor(
    private http: HttpClient,
  ) { }

  init(accid, token) {
    this.accid = accid;
    this.nim = SDK.NIM.getInstance({
      appKey: '9becfea0e0da17d58a4bb407a421b9dc',
      account: this.accid,
      token: token,// 'e9cd9ed5e0202dbbde9ac5cb47605cef',
      nick: 'nickname',
      avatar: 'imageUrl',
      onconnect: () => { this.onConnect() },
      ondisconnect: (obj) => { this.onDisconnect(obj) },
      onerror: (error) => { this.onError(error) },
      //消息
      onmsg: (msg) => { this.onMsg(msg) },
      onroamingmsgs: (msgs) => { this.saveMsgs(msgs) },
      onofflinemsgs: (msgs) => { this.saveMsgs(msgs) },
      // onTeamMsgReceipt: onTeamMsgReceipt.bind(this),
      //会话
      // 同步会话未读数
      syncSessionUnread: true,
      syncRoamingMsgs: true,
      syncMsgReceipts: true,
      onsessions: (sessions) => { this.onSessions(sessions) },
      onupdatesession: (sessions) => { this.onUpdatesession(sessions) },
      onsyncdone: () => { this.onSyncDone() },
      onsyncmarkinblacklist: (param) => { this.onSyncMarkinBlacklist(param) },
      onsyncmarkinmutelist: (param) => { this.onSyncMarkinMutelist(param) }
      // onsyncfriendaction: onSyncFriendAction.bind(this)
    });
  }
  private onConnect() {
    console.log(this.accid + '连接成功');
  }
  private onDisconnect(obj) {
    console.log(this.accid + '连接断开', obj);
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
    msgs = msgs.msgs;
    console.log(msgs);
    // this.cache.addMsgs(msgs);
    // for (var i = 0; i < msgs.length; i++) {
    //   if (msgs[i].scene === 'p2p') {
    //     this.person[
    //       msgs[i].from !== userUID ? msgs[i].from : msgs[i].to
    //     ] = true;
    //   }
    // }
  }
  private onSessions(sessions) {
    console.log('收到会话列表', sessions);
    this.cache.sessions = this.nim.mergeSessions(this.cache.sessions, sessions);
    // updateSessionsUI();
  }
  private onUpdatesession(session) {
    console.log('会话更新了', session);
    this.cache.sessions = this.nim.mergeSessions(this.cache.sessions, session);
    // updateSessionsUI();
  }
  private onSyncDone() {
    console.log('消息同步完成');
  }

  private onSyncMarkinBlacklist(param) {
    console.log('onSyncMarkinBlacklist');
    console.log(param);
  }
  private onSyncMarkinMutelist(param) {
    console.log('onSyncMarkinMutelist');
    console.log(param);
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
  sendText(param) {
    this.nim.sendText(param);
  }
  getHistoryMsgs(param) {
    this.nim.getHistoryMsgs(param);
  }
  updateUnifo() {
    const appKey = "9becfea0e0da17d58a4bb407a421b9dc";
    const appSecret = "5ada3b441617";
    const nonce =  "12345";
    const curTime = parseInt(new Date().getTime() / 1000 +'');
    console.log(curTime);
    const checkSum = SHA2(appSecret + nonce + curTime);
    console.log(checkSum);
    const url = 'https://api.netease.im/nimserver/user/updateUinfo.action';
    console.log(this.accid);
    let formdata = new FormData();
    formdata.append('accid', this.accid);
    formdata.append('name', 'sb');
    this.http.head
    return this.http.post(url, {}, {
      headers: new HttpHeaders({
        'AppKey':  '9becfea0e0da17d58a4bb407a421b9dc',
        'Nonce': '12345',
        'CurTime': curTime + '',
        'CheckSum': checkSum,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      }),
      params: {
        'accid': this.accid,
        'name': 'sb',
      }
    });

    // SHA1  
    function add(x, y) {  
      return((x & 0x7FFFFFFF) + (y & 0x7FFFFFFF)) ^ (x & 0x80000000) ^ (y & 0x80000000);  
    }  

    function SHA1hex(num) {  
      var sHEXChars = "0123456789abcdef";  
      var str = "";  
      for(var j = 7; j >= 0; j--)  
          str += sHEXChars.charAt((num >> (j * 4)) & 0x0F);  
      return str;  
    }  

    function AlignSHA1(sIn) {  
      var nblk = ((sIn.length + 8) >> 6) + 1,  
          blks = new Array(nblk * 16);  
      for(var i = 0; i < nblk * 16; i++) blks[i] = 0;  
      for(i = 0; i < sIn.length; i++)  
          blks[i >> 2] |= sIn.charCodeAt(i) << (24 - (i & 3) * 8);  
      blks[i >> 2] |= 0x80 << (24 - (i & 3) * 8);  
      blks[nblk * 16 - 1] = sIn.length * 8;  
      return blks;  
    }  

    function rol(num, cnt) {  
      return(num << cnt) | (num >>> (32 - cnt));  
    }  

    function ft(t, b, c, d) {  
      if(t < 20) return(b & c) | ((~b) & d);  
      if(t < 40) return b ^ c ^ d;  
      if(t < 60) return(b & c) | (b & d) | (c & d);  
      return b ^ c ^ d;  
    }  

    function kt(t) {  
      return(t < 20) ? 1518500249 : (t < 40) ? 1859775393 :  
          (t < 60) ? -1894007588 : -899497514;  
    }  

    function SHA1(sIn) {  
      var x = AlignSHA1(sIn);  
      var w = new Array(80);  
      var a = 1732584193;  
      var b = -271733879;  
      var c = -1732584194;  
      var d = 271733878;  
      var e = -1009589776;  
      for(var i = 0; i < x.length; i += 16) {  
          var olda = a;  
          var oldb = b;  
          var oldc = c;  
          var oldd = d;  
          var olde = e;  
          for(var j = 0; j < 80; j++) {  
              if(j < 16) w[j] = x[i + j];  
              else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);  
              let t = add(add(rol(a, 5), ft(j, b, c, d)), add(add(e, w[j]), kt(j)));  
              e = d;  
              d = c;  
              c = rol(b, 30);  
              b = a;  
              a = t;  
          }  
          a = add(a, olda);  
          b = add(b, oldb);  
          c = add(c, oldc);  
          d = add(d, oldd);  
          e = add(e, olde);  
      }  
      var SHA1Value = SHA1hex(a) + SHA1hex(b) + SHA1hex(c) + SHA1hex(d) + SHA1hex(e);  
      return SHA1Value.toUpperCase();  
    }  

    function SHA2(sIn) {  
      return SHA1(sIn).toLowerCase();  
    }
  }
  getFormattedText(bytes) {
    const HEX_DIGITS = [ '0', '1', '2', '3', '4', '5',
            '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' ];
    let len = bytes.length;
    let buf = new Array(len * 2);
    for (let j = 0; j < len; j++) {
        buf.push(HEX_DIGITS[(bytes[j] >> 4) & 0x0f]);
        buf.push(HEX_DIGITS[bytes[j] & 0x0f]);
    }
    return buf.toString();
  }
}
