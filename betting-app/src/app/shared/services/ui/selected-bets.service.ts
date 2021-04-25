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
        const find = actualList.find(e => e.bet === bet && e.selectedOutcome === outcome);

        if (find !== undefined) {
            actualList.splice(actualList.indexOf(find), 1);
            console.log('actualList del', actualList);
            this.selectedOutcomes$.next(actualList);
        }
    }

    addBetToList(bet, selectedOutcome) {
        const actualList = this.selectedOutcomes$.getValue();
        console.log('actualList', actualList);
        const betOutcome: any = {
            bet,
            selectedOutcome
        };
        actualList.push(betOutcome);

        this.selectedOutcomes$.next(actualList);
    }
}
