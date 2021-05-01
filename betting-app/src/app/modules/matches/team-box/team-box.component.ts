import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { delay, take } from 'rxjs/operators';
import { SelectedBetsService } from 'src/app/shared/services/ui/selected-bets.service';
import { countries } from 'country-flags-svg';
import { CountryFlagUrlService } from 'src/app/shared/services/ui/country-flag-url.service';

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

    constructor(private selectedBetsService: SelectedBetsService,
                private countryFlagUrlService: CountryFlagUrlService) {
        this.setSelectedOutcomes();
    }

    setSelectedOutcomes() {
        this.selectedBetsService.selectedOutcomes$.subscribe(
            selected => {
                this.selectedOutcomes = selected;
                this.loaded = true;
            }
        );
    }

    ngOnInit(): void {

    }

    getFlagUrl(competition: string): string {

        const CountryData = this.countryFlagUrlService.getFlagUrlByCompetitionName(competition);

        if (CountryData !== undefined) {
            return CountryData.flag;
        }

        return '';
    }

    isClicked(fulLbet, outcome): boolean {
        // window.setTimeout(() => {
        //     // do something
        // }, 500);
        return this.selectedOutcomes.find(s => s.bet.eventId === fulLbet.eventId && s.selectedOutcome.pos === outcome.pos) !== undefined;
    }

    outCome1Clicked(bet, outcome): void {
        console.log('outCome1Clicked');
        this.setOutCome(bet, outcome);
    }

    outComeXClicked(bet, outcome): void {
        this.setOutCome(bet, outcome);
    }

    outCome2Clicked(bet, outcome): void {
        this.setOutCome(bet, outcome);
    }

    setOutCome(fulLbet, outcome) {

        const find = this.selectedOutcomes.find(s => s.bet.eventId === fulLbet.eventId && s.selectedOutcome.pos === outcome.pos);
        console.log('find', find);
        if (find !== undefined) {
            // delete bet from service
            this.selectedBetsService.removeBetFromList(fulLbet, outcome);
        } else {
            // add bet to service
            this.selectedBetsService.addBetToList(fulLbet, outcome);
        }
    }

}
