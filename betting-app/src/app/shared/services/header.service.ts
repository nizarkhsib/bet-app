import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HeaderService {

    currentHeaderDate = new BehaviorSubject('');

    constructor(private httpClient: HttpClient) {

    }

}
