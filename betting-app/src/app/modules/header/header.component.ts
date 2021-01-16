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

    private opened = false;


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

    private _toggleSidebar(): void {
        this.opened = !this.opened;
    }

    openNav(): void {
        document.getElementById('myNav').style.width = '80%';
        document.getElementById('topNav').style.display = 'block';
    }

    closeNav(): void {
        document.getElementById('myNav').style.width = '0%';
        document.getElementById('topNav').style.display = 'none';
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
