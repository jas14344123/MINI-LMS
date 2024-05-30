import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AccountService } from '../_services';

@Component({ templateUrl: './course.component.html' })
export class CourseComponent implements OnInit, AfterViewInit {
@ViewChild('calendarEl') calendarEl: ElementRef;
calendar: Calendar;
eventDate: string; // Property to hold the date input
eventDescription: string; // Property to hold the description input

account: any; // Define type based on your AccountService data structure

constructor(private accountService: AccountService) {}

ngOnInit() {
this.account = this.accountService.accountValue;
}

ngAfterViewInit() {
if (this.calendarEl && this.calendarEl.nativeElement) {
this.calendar = new Calendar(this.calendarEl.nativeElement, {
plugins: [dayGridPlugin],
initialView: 'dayGridMonth',
events: [
]
});
this.calendar.render();
}
}

addEvent() {
if (this.calendar && this.eventDate && this.eventDescription) {
this.calendar.addEvent({
title: this.eventDescription, // Use the description as the title
start: this.eventDate, // Use the selected date
allDay: true
});
}
}
}

