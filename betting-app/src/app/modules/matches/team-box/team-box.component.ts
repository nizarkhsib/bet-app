import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
    selector: 'app-team-box',
    templateUrl: './team-box.component.html',
    styleUrls: ['./team-box.component.scss']
})
export class TeamBoxComponent implements OnInit {

    @Output() sectionPosition = new EventEmitter();
    @Input() parisParDate;
    currentHeaderDate = '';
    constructor(private element: ElementRef, private headerService: HeaderService) { }

    ngOnInit(): void {
        console.log('parisPardate', this.parisParDate);
        this.headerService.currentHeaderDate.subscribe(
            value => this.currentHeaderDate = value
        );
        this.sectionPosition.emit({ name: this.parisParDate.date, position: this.element.nativeElement.offsetTop });
    }

    choice1Clicked(paris): void {

    }
}
