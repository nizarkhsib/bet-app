import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MatchesService {

    // private apiServer = 'https://www.pointdevente.parionssport.fdj.fr/api/competitions/1n2/offre/100';
    // https://www.pointdevente.parionssport.fdj.fr/api/1n2/offre?competition=263&sport=100
    private apiServer = '/api/1n2/offre?';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private httpClient: HttpClient) {

    }

    getCompetitionMatches(competitionId: number, sportId: number): Observable<any[]> {
        return this.httpClient.get<any[]>(this.apiServer + 'competition=' + competitionId + '' + '&sport=' + sportId);
    }

    getAllMatchesByCompetitionIds(competitionIds: number[], sportId: number): Observable<any[]> {
        const ids = competitionIds.join(',');
        return this.httpClient.get<any[]>(this.apiServer + 'competition=[' + ids + '' + ']&sport=' + sportId);
    }

}
