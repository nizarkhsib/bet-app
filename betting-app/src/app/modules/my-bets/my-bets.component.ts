import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SelectedBetsService } from 'src/app/shared/services/ui/selected-bets.service';

@Component({
    selector: 'app-my-bets',
    templateUrl: './my-bets.component.html',
    styleUrls: ['./my-bets.component.scss']
})
export class MyBetsComponent implements OnInit {
    form: FormGroup;
    selectedBetOutcomes;
    coteTotale = 1;
    gains = 1;
    hasDouble = false;
    constructor(private selectedBetsService: SelectedBetsService, private fb: FormBuilder) {

        this.form = this.fb.group({
            amount: 10
        });

        this.form.controls.amount.valueChanges.subscribe(
            montant => {
                this.gains = Math.floor(this.coteTotale * montant * 100) / 100;
            }
        );
    }

    ngOnInit(): void {
        this.selectedBetOutcomes = this.selectedBetsService.selectedOutcomes$.getValue();
        console.log('selectedBetOutcomes', this.selectedBetOutcomes);
        this.calculate();
    }

    calculate() {
        if (this.selectedBetOutcomes.length > 0) {
            this.selectedBetOutcomes.forEach(sbo => {
                const cote = parseFloat(sbo.selectedOutcome.cote.replace(',', '.'));
                this.coteTotale = this.coteTotale * cote;
            });
            this.coteTotale = Math.floor(this.coteTotale * 100) / 100;
            this.gains = Math.floor(this.coteTotale * this.getAmount() * 100) / 100;
        }
    }
    getAmount() {
        return this.form.controls.amount.value;
    }

    calculateGains() {
        this.gains = Math.floor(this.coteTotale * this.getAmount() * 100) / 100;
    }

    delete(betOutcome) {
        this.selectedBetsService.removeBetFromList(betOutcome.bet, betOutcome.selectedOutcome);
        this.coteTotale = 1;
        this.gains = 1;
        this.calculate();
    }

    isDouble(betOutcome): boolean {

        this.selectedBetOutcomes.find(s => s.bet.eventId === betOutcome.bet.eventId
            && betOutcome.selectedOutcome.pos !== s.selectedOutcome.pos) !== undefined
            ? this.hasDouble = true : this.hasDouble = false;

        return this.selectedBetOutcomes.find(s => s.bet.eventId === betOutcome.bet.eventId
            && betOutcome.selectedOutcome.pos !== s.selectedOutcome.pos) !== undefined;
    }


}
