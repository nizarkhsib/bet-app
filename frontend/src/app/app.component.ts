import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './shared/models/user';
import { AuthenticationService } from './shared/services/api/authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'angular10-crud';
    currentUser: User = null;
    constructor(private authenticationService: AuthenticationService, private router: Router) {
        this.authenticationService.currentUser.subscribe(
            (current) => {
                this.currentUser = current;
            }
        );
    }

    logout(): void {
        this.authenticationService.logout();
    }

}
