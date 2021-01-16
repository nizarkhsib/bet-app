import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, ChangeDetectionStrategy, Output, EventEmitter, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { from, Subject } from 'rxjs';
import { map, groupBy, mergeMap, reduce } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserForm } from 'src/app/forms/user.form';
import { MatPaginator } from '@angular/material/paginator';
import { Competition } from 'src/app/models/competition.model';
import { Router } from '@angular/router';
import { CompetitionSelectionComponent } from '../competition-selection/competition-selection.component';
import { CompetitionsService } from 'src/app/shared/services/competitions.service';
import { MatchesService } from 'src/app/shared/services/matches.services';
import { SportService } from 'src/app/shared/services/sport.service';
import { SelectionService } from 'src/app/shared/services/selection.service';
import { HeaderService } from 'src/app/shared/services/header.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, AfterViewInit {

    types: string[];

    title = 'Users list';

    userForm: UserForm;

    @ViewChild('searchInput') input: ElementRef;

    isAdminExist = false;

    competitionsArray: Competition[] = [];

    sportsArray: any[] = [];

    selectedCompetitions: Competition[] = [];

    selectedSport = 100;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    eventsSubject: Subject<void> = new Subject<void>();

    listeParis: any[] = [];

    parisGroupedByDate: any[] = [];

    loading = false;

    loadingTop = false;

    topBets: any[] = [];

    selection: Competition[] = [];

    // @TODO add fetch by competitions

    constructor(public fb: FormBuilder,
                public dialog: MatDialog,
                private snackBar: MatSnackBar,
                public chartDialog: MatDialog,
                public deleteConfirmDialog: MatDialog,
                private competitionService: CompetitionsService,
                private matchesService: MatchesService,
                private sportService: SportService,
                private selectionService: SelectionService,
                private headerService: HeaderService,
                private ngxLoader: NgxUiLoaderService,
                private router: Router) {

        this.selectionService.competitionSubject.subscribe(
            (val) => {
                if (val.length > 0) {
                    this.selectedCompetitions = val;
                    this.loadMatches();
                }

            }
        );
    }

    ngOnInit(): void {
        this.getTopBets();
        this.getSportsList();
    }

    ngAfterViewInit(): void {
    }

    openMatches(competitionId: number): void {
        this.router.navigate(['matches', competitionId]);
    }

    // selectClicked(): void {
    //     this.openDialog();
    // }

    getSportsList(): void {
        this.sportService.getAll().subscribe(
            result => {

                result.forEach(sport => {
                    if (sport.hasBet) {

                        this.competitionService.getAll(sport.id).subscribe(
                            (competitions: Competition[]) => {
                                sport.competitions = competitions;
                                this.sportsArray.push(sport);
                            }
                        );
                    }
                });
                // console.log('this.sportsARray', this.sportsArray);
                this.selectionService.sportsArray.next(this.sportsArray);

                // sport + competition

                // this.getCompetitionsList(this.selectedSport);

                this.selectionService.getCurrentSelectedCompetitions().subscribe(
                    competitions => {
                        this.selectedCompetitions = competitions;
                    }
                );

            }
        );
    }

    getCompetitionsList(event): void {

        this.selectionService.competitionSubject.next([]);
        this.loading = false;

        this.selectedSport = event;
        this.competitionService.getAll(this.selectedSport).subscribe(
            (competitions: Competition[]) => {
                this.competitionsArray = competitions;
            }
        );
    }



    getTopBets(): void {
        this.loadingTop = true;
        this.matchesService.getTopBets().subscribe(
            result => {
                this.topBets = result;
                this.loadingTop = false;
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
}

export class GroupedParis {
    date: string;
    values: any[];
}


