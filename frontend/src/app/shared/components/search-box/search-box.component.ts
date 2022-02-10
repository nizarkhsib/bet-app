import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

    @Output() closed = new EventEmitter();
    // @Input() isOpen: boolean;

    constructor() { }

    ngOnInit(): void {

    }

    openSearch(): void {
        document.getElementById('myOverlay').style.display = 'block';
    }


    closeSearch(): void {
        document.getElementById('myOverlay').style.display = 'none';
        this.closed.emit(true);
    }

}
