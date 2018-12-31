import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  response = new Subject();
  response2: string;
  $response = this.response.asObservable();
  constructor() { }

  doResponse(response) {
    this.response.next(response);
  }

}
