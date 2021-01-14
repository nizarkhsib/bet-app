import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    currentUser: User = null;
    displayHeader = false;
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
    ngOnInit(): void {
    }

    logout(): void {
        this.authenticationService.logout();
    }

    navigateToFriends(): void {
        this.router.navigate(['/login']);
    }

}
