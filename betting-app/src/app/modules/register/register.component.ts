import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UsersService } from 'src/app/shared/services/users.service';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    registerError = false;
    errorMessage = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        // private authenticationService: AuthenticationService,
        private userService: UsersService,
        // private alertService: AlertService
    ) {
        // redirect to home if already logged in
        // if (this.authenticationService.currentUserValue) {
        //     this.router.navigate(['/']);
        // }]),
    }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f(): any { return this.registerForm.controls; }

    onSubmit(): void {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        const register = {
            email: this.registerForm.controls.email.value,
            username: this.registerForm.controls.email.value,
            password: this.registerForm.controls.email.value,
        };

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    // this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                    console.log('data', data);
                },
                error => {
                    // this.alertService.error(error);
                    console.log('error', error);
                    this.registerError = true;
                    this.errorMessage = error.error.message;
                    console.log('errorMessage', this.errorMessage);
                    // this.registerForm.reset();
                    this.loading = false;
                });
    }
}
