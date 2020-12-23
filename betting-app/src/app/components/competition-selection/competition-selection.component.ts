import { Component, OnInit, Inject, Optional, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { UserForm } from 'src/app/forms/user.form';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Competition } from 'src/app/models/competition.model';
import { UsersService } from 'src/app/shared/services/users.service';
import { SelectionService } from 'src/app/shared/services/selection.service';

@Component({
    selector: 'app-competition-select',
    templateUrl: './competition-selection.component.html',
    styleUrls: ['./competition-selection.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CompetitionSelectionComponent implements OnInit, OnDestroy {
    types: string[];
    userForm: UserForm;
    emailAlreadyExist = false;

    // list of all competitions
    competitions: Competition[] = [];
    // list of selected competitions competitions
    selection: Competition[] = [];

    constructor(fb: FormBuilder,
                public dialogRef: MatDialogRef<CompetitionSelectionComponent>,
                @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
                private usersService: UsersService,
                private selectionService: SelectionService
    ) {
        this.competitions = this.data.competitions;
        this.selectionService.getCurrentSelectedCompetitions().subscribe(
            competitions => {
                this.selection = competitions;
            }
        );
    }

    ngOnInit(): void {

    }

    onNoClick(): void {
        this.dialogRef.close('closed');
    }

    isChecked(competition: Competition): boolean {
        if (this.selection !== null) {
            const comp = this.selection.indexOf(competition);
            if (comp > -1) {
                return true;
            }
        }

        return false;
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
    }

    ngOnDestroy(): void {
        this.selection = null;
    }

}
