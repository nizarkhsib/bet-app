import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { take } from 'rxjs/operators';
import { SelectedBetsService } from 'src/app/shared/services/ui/selected-bets.service';

@Component({
    selector: 'app-team-box',
    templateUrl: './team-box.component.html',
    styleUrls: ['./team-box.component.scss']
})
export class TeamBoxComponent implements OnInit {

    @Output() sectionPosition = new EventEmitter();
    @Input() paris;
    currentHeaderDate = '';
    selectedOutcomes: any[] = [];
    loaded = false;
    constructor(private selectedBetsService: SelectedBetsService) {
        this.selectedBetsService.selectedOutcomes$.pipe(
            take(1)
        ).subscribe(
            selected => {
                console.log('selected', selected);
                // this.selectedOutcomes = selected.map(s => s.selectedOutcome);
                this.selectedOutcomes = selected;
                this.loaded = true;
            }
        );
    }

    ngOnInit(): void {

    }

    isClicked(fulLbet, outcome): boolean {
        console.log('clicked ');
        return this.selectedOutcomes.find(s => s.bet === fulLbet && s.selectedOutcome === outcome) !== undefined;
    }

    outCome1Clicked(bet, outcome): void {
        this.setOutCome(bet, outcome);
    }

    outComeXClicked(bet, outcome): void {
        this.setOutCome(bet, outcome);
    }

    outCome2Clicked(bet, outcome): void {
        this.setOutCome(bet, outcome);
    }

    setOutCome(fulLbet, outcome) {

        const find = this.selectedOutcomes.find(s => s.bet === fulLbet && s.selectedOutcome === outcome);

        if (find !== undefined) {
            // delete bet from service
            this.selectedBetsService.removeBetFromList(fulLbet, outcome);
        } else {
            // add bet to service
            this.selectedBetsService.addBetToList(fulLbet, outcome);
        }
    }

}
