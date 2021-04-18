import { Component, OnInit, Inject, Optional, ChangeDetectionStrategy, OnDestroy, Input, ViewChild } from '@angular/core';
import { UserForm } from 'src/app/forms/user.form';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Competition } from 'src/app/models/competition.model';
import { UsersService } from 'src/app/shared/services/users.service';
import { SelectionService } from 'src/app/shared/services/selection.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatchesService } from 'src/app/shared/services/matches.services';
import { from } from 'rxjs';
import { groupBy, map, mergeMap, reduce } from 'rxjs/operators';
import { CompetitionsListComponent } from '../competitions-list/competitions-list.component';

@Component({
    selector: 'app-selected-competitions',
    templateUrl: './selected-competitions.component.html',
    styleUrls: ['./selected-competitions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class SelectedCompetitionsComponent implements OnInit, OnDestroy {

    @ViewChild(CompetitionsListComponent) competitionsListComponent;
    sportsArray: any[] = [];
    @Input() listeParis: any[] = [];
    selectedCompetitions: Competition[] = [];
    selectedSport = 100;
    parisGroupedByDate: any[] = [];
    loading = false;
    // @TODO add fetch by competitions
    constructor(private ngxLoader: NgxUiLoaderService,
                private router: Router,
                private matchesService: MatchesService,
                private selectionService: SelectionService,
    ) {

    }

    ngOnInit(): void {
        this.getCompetitionsWithMatches();
        this.listeToRouterChange();
    }

    listeToRouterChange() {
        this.router.events.subscribe((val) => {
            // see also
            if (val instanceof NavigationEnd && val.url === '/') {
                this.selectionService.competitionSubject.next([]);
            }
        });
    }

    getCompetitionsWithMatches() {
        this.selectionService.competitionSubject.subscribe(
            (val) => {
                this.selectedCompetitions = val;
                if (val.length > 0) {
                    this.loadMatches();
                } else {
                    this.parisGroupedByDate = [];
                    this.router.navigate(['']);
                }
            }
        );
    }

    loadMatches(): void {

        this.ngxLoader.start();
        this.loading = true;
        this.listeParis = [];
        this.parisGroupedByDate = [];
        const competitionIds: number[] = this.selectedCompetitions.map((item: any) => {
            return item.id;
        });

        if (competitionIds.length > 0) {
            this.matchesService.getAllMatchesByCompetitionIds(competitionIds, this.selectedSport).subscribe(
                paris => {
                    this.listeParis = paris;
                    this.listeParis.sort((a, b) => new Date(a.end).getTime() - new Date(b.end).getTime());

                    const groupedByDate = from(
                        this.listeParis
                    )
                        .pipe(
                            groupBy(p => p.end.slice(0, 10), p => p),
                            mergeMap(group$ =>
                                group$.pipe(reduce((acc, cur) => [...acc, cur], [`${group$.key}`]))
                            ),
                            map(arr => ({ date: arr[0], liste: arr.slice(1) }))
                        );

                    groupedByDate.subscribe(val => {
                        this.parisGroupedByDate.push(val);
                    },
                        (err) => {
                            console.log(err);
                        },
                        () => {
                            this.loading = false;
                            this.ngxLoader.stop();
                            this.parisGroupedByDate = this.removeDuplicateObjects(this.parisGroupedByDate);
                        });
                }
            );
        }
    }

    removeDuplicateObjects = (myArr) => {
        const uniqueArr = [];
        const objStrings = [];

        myArr.forEach((element) => {
            if (typeof element === 'object' && element !== null) {
                const eleString = JSON.stringify(element);
                if (!objStrings.includes(eleString)) {
                    uniqueArr.push(element);
                    objStrings.push(eleString);
                }
            }
        });

        return uniqueArr;
    }

    ngOnDestroy(): void {
    }

}
