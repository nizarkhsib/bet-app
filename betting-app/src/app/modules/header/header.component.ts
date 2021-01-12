import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    currentUser: User = null;
    constructor(private authenticationService: AuthenticationService,
                private router: Router) {
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
