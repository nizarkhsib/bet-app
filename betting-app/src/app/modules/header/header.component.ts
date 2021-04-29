import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { AuthenticationService } from 'src/app/shared/services/api/authentication.service';
import { HeaderService } from 'src/app/shared/services/ui/header.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    opened = false;
    isOpenSearch = false;
    currentUser: User = null;
    displayHeader = false;
    navBtnClicked = false;
    constructor(private authenticationService: AuthenticationService,
                private headerService: HeaderService,
                private router: Router) {

        this.headerService.displayMenuIcon.subscribe(
            val => this.displayHeader = val
        );

        this.authenticationService.currentUser.subscribe(
            (current) => {
                this.currentUser = current;
            }
        );

    }

    @HostListener('document:click', ['$event'])
    clickout(event) {
        if (!document.getElementById('myNav').contains(event.target)) {
            // if side nav is opened
            if (this.opened) {
                this.closeNav();
                this.opened = !this.opened;
            }
        }
    }

    openNav(): void {
        document.getElementById('myNav').style.width = '60%';
        document.getElementById('topNav').style.display = 'block';


        document.getElementById('myNavBg').style.width = '100%';
        // document.getElementById('topNav').style.display = 'block';
        setTimeout(() => {
            this.opened = true;
        }, 100);
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
