import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { AuthenticationService } from 'src/app/shared/services/api/authentication.service';
import { HeaderService } from 'src/app/shared/services/ui/header.service';
import { SelectedBetsService } from 'src/app/shared/services/ui/selected-bets.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    opened = new BehaviorSubject(false);
    isOpenSearch = false;
    currentUser: User = null;
    displayHeader = false;
    navBtnClicked = false;
    outcomesNumber = 0;
    constructor(private authenticationService: AuthenticationService,
                private headerService: HeaderService,
                private selectedBetOutcomesService: SelectedBetsService,
                private router: Router) {

        this.headerService.displayMenuIcon.subscribe(
            val => this.displayHeader = val
        );

        this.authenticationService.currentUser.subscribe(
            (current) => {
                this.currentUser = current;
            }
        );

        this._getSelectedOutcomesNumber();
    }

    private _getSelectedOutcomesNumber() {

        this.selectedBetOutcomesService.selectedOutcomes$.subscribe(
            selectedOutcomes => {
                this.outcomesNumber = selectedOutcomes.length;
            }
        );
    }

    @HostListener('document:click', ['$event'])
    clickout(event) {
        // if we click outside myNav
        if (!document.getElementById('myNav').contains(event.target)) {

            // if we clicked btnNav
            if (document.getElementById('btnNav').contains(event.target)) {

                document.getElementById('myNav').style.width = '60%';
                document.getElementById('topNav').style.display = 'block';

                document.getElementById('myNavBg').style.width = '100%';
                this.opened.next(true);
                return;
            }

            // if we clicked outside && nav is opened
            if (this.opened.getValue()) {
                this.closeNav();
                this.opened.next(!this.opened);
            }
        }
    }

    openNav(): void {

        document.getElementById('myNav').style.width = '60%';
        document.getElementById('topNav').style.display = 'block';

        document.getElementById('myNavBg').style.width = '100%';

        this.opened.next(true);
    }

    closeNav(): void {
        document.getElementById('myNav').style.width = '0%';
        document.getElementById('topNav').style.display = 'none';
        document.getElementById('myNavBg').style.width = '0%';
    }

    closedSearchBox(): void {
        this.isOpenSearch = false;
    }

    openSearch(): void {
        this.isOpenSearch = true;
    }

    ngOnInit(): void {
    }

    logout(): void {
        this.authenticationService.logout();
    }

    navigateToFriends(): void {
        this.router.navigate(['/login']);
    }
}
