import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Event } from '@app/_models';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class EventService {
    private baseUrl = `${environment.apiUrl}/events`;

    constructor(private http: HttpClient) {}

    getAllEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(this.baseUrl);
    }

    addEvent(event: Event): Observable<Event> {
        return this.http.post<Event>(this.baseUrl, event);
    }

    deleteEvent(eventId: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${eventId}`);
    }
}
