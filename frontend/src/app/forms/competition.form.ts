import { FormGroup, FormControl } from '@angular/forms';

export class CompetitionForm {

    form = new FormGroup({
        id: new FormControl(),
        label: new FormControl(''),
    });

    constructor() {

    }
}
