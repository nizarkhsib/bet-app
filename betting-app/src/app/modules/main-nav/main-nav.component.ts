import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SportService } from 'src/app/shared/services/sport.service';
import { CompetitionsService } from 'src/app/shared/services/competitions.service';
import { Competition } from 'src/app/models/competition.model';
import { SelectionService } from 'src/app/shared/services/selection.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { User } from 'src/app/shared/models/user';

@Component({
    selector: 'app-main-nav',
    templateUrl: './main-nav.component.html',
    styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

    sportsArray: any[] = [];
    selectedCompetitions: Competition[] = [];
    selection: Competition[] = [];
    loading = false;
    currentUser: User = null;
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    constructor(private breakpointObserver: BreakpointObserver,
                private sportService: SportService,
                private selectionService: SelectionService,
                private competitionService: CompetitionsService,
                private ngxLoader: NgxUiLoaderService,
                private authenticationService: AuthenticationService,
                private router: Router) {
        this.authenticationService.currentUser.subscribe(
            (current) => {
                this.currentUser = current;
            }
        );
        this.getSportsList();

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

    navigateToFriends(): void {
        this.router.navigate(['/login']);
    }

}
