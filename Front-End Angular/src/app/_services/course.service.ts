import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Course } from '@app/_models';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class CourseService {
    private baseUrl = `${environment.apiUrl}/courses`;

    constructor(private http: HttpClient) {}

    getAllCourses(): Observable<Course[]> {
        return this.http.get<Course[]>(this.baseUrl);
    }

    createCourse(course: Course): Observable<Course> {
        return this.http.post<Course>(this.baseUrl, course);
    }

    deleteCourse(courseId: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${courseId}`);
    }
}
