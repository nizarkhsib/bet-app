import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-date-header',
    templateUrl: './date-header.component.html',
    styleUrls: ['./date-header.component.scss']
})
export class DateHeaderComponent implements OnInit {

    @Output() headerPosition = new EventEmitter();
    @Input() date: string;

    @ViewChild('dateHeader') dateHeader: ElementRef;
    constructor(private element: ElementRef, private vc: ViewportScroller) { }

    ngOnInit(): void {
        this.headerPosition.emit({ name: this.date, position: this.element.nativeElement.offsetTop });
    }

    @HostListener('window:resize', ['$event'])
    onResize(event): void {
        this.headerPosition.emit({ name: this.date, position: this.element.nativeElement.offsetTop });
    }

}
