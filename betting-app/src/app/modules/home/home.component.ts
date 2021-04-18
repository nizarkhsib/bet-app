import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Competition } from 'src/app/models/competition.model';
import { Router } from '@angular/router';
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

    competitionsArray: Competition[] = [];
    sportsArray: any[] = [];
    selectedCompetitions: Competition[] = [];
    selectedSport = 100;
    loading = false;
    loadingTop = false;
    topBets: any[] = [];
    selection: Competition[] = [];
    // @TODO add fetch by competitions
    displayedSelected = false;

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
                this.selectedCompetitions = val;
                if (val.length > 0) {
                    this.displayedSelected = true;
                    // this.loadMatches();
                    this.router.navigate(['/competitions']);
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

                this.selectionService.sportsArray.next(this.sportsArray);

                this.selectionService.getCurrentSelectedCompetitions().subscribe(
                    competitions => {
                        this.selectedCompetitions = competitions;
                    }
                );

            }
        );
    }

    getTopBets(): void {
        this.loadingTop = true;
        this.matchesService.getTopBets().subscribe(
            result => {
                this.topBets = result.filter(bet => bet.marketTypeId === '1');
                this.loadingTop = false;
            }
        );
    }
}

export class GroupedParis {
    date: string;
    values: any[];
}


