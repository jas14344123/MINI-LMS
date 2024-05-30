import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Announcement } from '@app/_models';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class AnnouncementService {
    private baseUrl = `${environment.apiUrl}/announcements`;

    constructor(private http: HttpClient) {}

    getAllAnnouncements(): Observable<Announcement[]> {
        return this.http.get<Announcement[]>(this.baseUrl);
    }

    createAnnouncement(announcement: Announcement): Observable<Announcement> {
        return this.http.post<Announcement>(this.baseUrl, announcement);
    }

    deleteAnnouncement(announcementId: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${announcementId}`);
    }
}
