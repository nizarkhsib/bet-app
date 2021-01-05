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
    @ViewChild('dateHeaderFixed') dateHeaderFixed: ElementRef;
    @ViewChild('dateHeader') dateHeader: ElementRef;

    @Input() listeParis: any[];
    @Input() sportId: number;
    @Input() events: Observable<void>;
    positions: any[] = [];
    selectedParis: any;
    public currentSectionName: string = null;

    selection1x2: Choice1x2[] = [];
    public sectionsIndex: any = [];

    // private eventsSubscription: Subscription;
    constructor(private el: ElementRef,
                private headerService: HeaderService) {
    }

    ngOnInit(): void {

        if (this.listeParis.length > 0) {
            this.selectedParis = this.listeParis[0];
            this.headerService.currentHeaderDate.next(this.currentSectionName);
        }
    }

    selectionChange(event): void {
        this.selectedParis = event.value;
    }

    sectionPosition($event): void {
        const index = this.positions.indexOf($event);
        if (index < 0) {
            this.positions.push($event);
        }

        // filter out the old position if it has been set
        this.sectionsIndex = this.sectionsIndex.filter(item => item.name !== $event.name);
        // set the new position
        this.sectionsIndex.push($event);
        // sort the section based on their apperance order
        this.sectionsIndex.sort((a: any, b: any) => {
            return b.position - a.position;
        });

        // if the page has already been scrolled find the current name
        if (document.body.scrollTop > 0) {
            this.currentSectionName = this.getCurrentSectionName();
        }
    }

    getListeParis(date: string): any {
        return this.listeParis.find(element => element.date === date);
    }


    @HostListener('window:scroll', ['$event'])
    onWindowScroll($event): void {

        this.currentSectionName = this.getCurrentSectionName();
        this.headerService.currentHeaderDate.next(this.currentSectionName);
        if (this.currentSectionName === null) {
            this.headerService.currentHeaderDate.next(this.currentSectionName);
        }

    }

    private getCurrentSectionName(): string {
        const offset: number = this.el.nativeElement.parentElement.offsetTop - this.el.nativeElement.offsetTop;
        for (const section of this.sectionsIndex) {
            // Note: 13px is the margin-top value of the h2 element in the header
            if ((section.position + offset - window.scrollY - 340) < 0) {
                return section.name;
            }
        }
        return null;
    }

    choice1Clicked(paris): void {
        this.selection1x2.push(paris);
    }

}
