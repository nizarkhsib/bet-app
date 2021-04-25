import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SportService {

    // private apiServer = 'https://www.pointdevente.parionssport.fdj.fr/api/competitions/1n2/offre/100';
    private apiServer = '/api/list-sports/1n2/offre';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private httpClient: HttpClient) {

    }

    getAll(): Observable<any[]> {
        return this.httpClient.get<any[]>(this.apiServer);
    }

}
