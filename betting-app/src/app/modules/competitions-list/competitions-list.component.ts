import { Component } from '@angular/core';
import { SportService } from 'src/app/shared/services/sport.service';
import { CompetitionsService } from 'src/app/shared/services/competitions.service';
import { Competition } from 'src/app/models/competition.model';
import { SelectionService } from 'src/app/shared/services/selection.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
    selector: 'app-competitions-list',
    templateUrl: './competitions-list.component.html',
    styleUrls: ['./competitions-list.component.scss']
})
export class CompetitionsListComponent {

    sportsArray: any[] = [];
    selectedCompetitions: Competition[] = [];
    selection: Competition[] = [];
    loading = false;

    constructor(
        private sportService: SportService,
        private selectionService: SelectionService,
        private competitionService: CompetitionsService,
        private ngxLoader: NgxUiLoaderService,
        private authenticationService: AuthenticationService,
        private router: Router) {

        console.log(this.router.url);

        this.selectionService.competitionSubject.subscribe(
            (val) => {
                this.selectedCompetitions = val;
            }
        );

        this.getSportsList();

    }

    isChecked(competition: Competition): boolean {

        const x = this.selectedCompetitions.find(sel => sel === competition);

        if (x === undefined) {
            return false;
        }

        return true;
    }

    getSportsList(): void {
        this.sportService.getAll().subscribe(
            result => {
                result.forEach(sport => {
                    if (sport.hasBet && sport.id !== undefined) {

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



    selectionChange(event, competition: Competition): void {


        if (event === true) {
            const x = this.selection.find(sel => sel === competition);

            if (x === undefined) {
                this.selection.push(competition);
                this.selectionService.addCompetition(competition);
            }
        }

        if (event === false) {

            const index = this.selection.indexOf(competition);

            if (index > -1) {

                this.selection.splice(index, 1);
                this.selectionService.removeCompetition(competition);
            }
        }

        this.selection.length === 0 ? this.ngxLoader.stop() : this.ngxLoader.start();

        this.handleLoader();
    }

    handleLoader() {
        if (this.selection.length === 0) {
            this.ngxLoader.stop();
            this.loading = false;
        } else {
            this.ngxLoader.start();
            this.loading = true;
        }
    }

    logout(): void {
        this.authenticationService.logout();
    }

}
