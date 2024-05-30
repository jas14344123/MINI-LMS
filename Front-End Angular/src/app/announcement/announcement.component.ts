import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Calendar, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AccountService, EventService } from '../_services';
import { Event } from '@app/_models/event'; // Adjust the import path if necessary

@Component({ templateUrl: './announcement.component.html' })
export class AnnouncementComponent implements OnInit, AfterViewInit {
    @ViewChild('calendarEl') calendarEl: ElementRef;
    calendar: Calendar;
    eventDate: string;
    eventDescription: string;
    events: Event[] = [];

    account: any;

    constructor(
        private accountService: AccountService,
        private eventService: EventService
    ) {}

    ngOnInit() {
        this.account = this.accountService.accountValue;

        // Fetch events from the backend
        this.eventService.getAllEvents().subscribe(
            (data: Event[]) => {
                console.log('Fetched events:', data); // Debugging
                this.events = data;
                if (this.calendar) {
                    console.log('Adding events to calendar:', this.formatEvents(this.events));
                    this.calendar.addEventSource(this.formatEvents(this.events));
                }
            },
            error => {
                console.error('Error fetching events:', error);
            }
        );
    }

    ngAfterViewInit() {
        this.initializeCalendar();
    }

    initializeCalendar() {
        if (this.calendarEl && this.calendarEl.nativeElement) {
            console.log('Initializing calendar with events:', this.formatEvents(this.events));
            this.calendar = new Calendar(this.calendarEl.nativeElement, {
                plugins: [dayGridPlugin],
                initialView: 'dayGridMonth',
                events: this.formatEvents(this.events) // Load initial events
            });
            this.calendar.render();
        }
    }

    formatEvents(events: Event[]): EventInput[] {
        const formattedEvents = events.map(event => ({
            title: event.eventDescription,
            start: event.eventDate, // Ensure this is a valid date format
            allDay: true
        }));
        console.log('Formatted events:', formattedEvents); // Log formatted events
        return formattedEvents;
    }

    addEvent() {
        if (this.calendar && this.eventDate && this.eventDescription) {
            const newEvent: Event = {
                eventDate: new Date(this.eventDate), // Ensure this is converted to Date object
                eventDescription: this.eventDescription
            };

            this.eventService.addEvent(newEvent).subscribe(
                response => {
                    this.calendar.addEvent({
                        title: this.eventDescription,
                        start: this.eventDate,
                        allDay: true
                    });
                    this.events.push(response);
                },
                error => {
                    console.error('Error adding event:', error);
                    alert('Failed to add event. Please try again.');
                }
            );
        }
    }
}
