import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'app-validated-bets',
    templateUrl: './validated-bets.component.html',
    styleUrls: ['./validated-bets.component.scss']
})
export class ValidatedBetsComponent implements OnInit {

    bulletins;

    constructor() { }

    ngOnInit(): void {
        this.bulletins = JSON.parse(localStorage.getItem('bulletins'));
        console.log('bulletins', this.bulletins);
    }

}
