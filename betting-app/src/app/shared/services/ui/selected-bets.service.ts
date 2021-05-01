import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SelectedBetsService {

    selectedOutcomes$ = new BehaviorSubject<any[]>([]);

    constructor() { }

    removeBetFromList(bet, outcome) {
        const actualList = this.selectedOutcomes$.getValue();
        const find = actualList.find(s => s.bet.eventId === bet.eventId && s.selectedOutcome.pos === outcome.pos);

        if (find !== undefined) {
            actualList.splice(actualList.indexOf(find), 1);
            this.selectedOutcomes$.next(actualList);
        }
    }

    addBetToList(bet, selectedOutcome) {
        const actualList = this.selectedOutcomes$.getValue();
        const betOutcome: any = {
            bet,
            selectedOutcome
        };
        actualList.push(betOutcome);

        this.selectedOutcomes$.next(actualList);
    }
}
