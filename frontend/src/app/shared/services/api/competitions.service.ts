import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Competition } from 'src/app/models/competition.model';

@Injectable({
    providedIn: 'root'
})
export class CompetitionsService {

    // private apiServer = 'https://www.pointdevente.parionssport.fdj.fr/api/competitions/1n2/offre/100';
    private apiServer = '/api/competitions/1n2/offre/';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private httpClient: HttpClient) {

    }

    getAll(sportId: number): Observable<Competition[]> {
        return this.httpClient.get<Competition[]>(this.apiServer + sportId);
    }

}
