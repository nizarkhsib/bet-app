import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Choice1x2 } from 'src/app/shared/models/choice1x2';
import { HeaderService } from 'src/app/shared/services/header.service';
import { MatchesService } from 'src/app/shared/services/matches.services';
import { SelectionService } from 'src/app/shared/services/selection.service';

@Component({
    selector: 'app-matches',
    templateUrl: './matches.component.html',
    styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {

    @Input() listeParis: any[];
    @Input() sportId: number;
    @Input() events: Observable<void>;
    selectedParis: any;
    public currentSectionName: string = null;

    selection1x2: Choice1x2[] = [];
    public sectionsIndex: any = [];

    constructor(private el: ElementRef,
                private headerService: HeaderService) {
    }

    ngOnInit(): void {

        if (this.listeParis.length > 0) {
            this.selectedParis = this.listeParis[0];
        }
    }

    selectionChange(event): void {
        this.selectedParis = [];
        this.selectedParis = event.value;
    }

    getListeParis(date: string): any {
        return this.listeParis.find(element => element.date === date);
    }

    choice1Clicked(paris): void {
        this.selection1x2.push(paris);
    }

}
