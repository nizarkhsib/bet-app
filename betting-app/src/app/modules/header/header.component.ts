import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    currentUser: User = null;
    constructor(private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser.subscribe(
            (current) => {
                this.currentUser = current;
                console.log('current', this.currentUser);
            }
        );
    }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

    logout(): void {
        this.authenticationService.logout();
    }

}
