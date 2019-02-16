import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CarChoiceService {

    request = new Subject();
    response = new Subject();
    $response = this.response.asObservable();
    $request = this.request.asObservable();

    constructor(private http: HttpClient) {}

    doRequest(value) {
        this.request.next(value);
    }
    doResponse(value) {
        this.response.next(value);
    }
    searchBrand() {
        const url = '/car111/api/searchBrand';
        return this.http.get(url);
    }
    searchCarTree(param) {
        const url = '/car/api/searchCarTree';
        return this.http.post(url, param);
    }
}
