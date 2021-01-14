import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Competition } from 'src/app/models/competition.model';


@Injectable({
    providedIn: 'root'
})
export class SelectionService {

    competitionSubject = new BehaviorSubject<Competition[]>([]);
    sportsArray = new BehaviorSubject<any[]>([]);

    constructor() {
    }

    addCompetition(competition: Competition): void {
        const index = this.competitionSubject.value.indexOf(competition);

        if (index === -1) {
            this.competitionSubject.next(this.competitionSubject.getValue().concat(competition));
        }
    }

    removeCompetition(competition: Competition): void {

        const index = this.competitionSubject.value.indexOf(competition);

        if (index > -1) {
            const e = this.competitionSubject.value;
            e.splice(index, 1);
            this.competitionSubject.next(e);
        }
    }

    getCurrentSelectedCompetitions(): Observable<Competition[]> {
        return this.competitionSubject.asObservable();
    }

}
