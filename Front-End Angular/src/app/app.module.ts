import { NgModule, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor, appInitializer } from './_helpers';
import { AccountService } from './_services';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home/home.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { CourseComponent } from './course/course.component';
import { CourseManagementComponent } from './course-management/course-management.component';

// ANNOUNCEMENT
import { AnnouncementListComponent } from './announcement-list/announcement-list.component';
import { AnnouncementFormComponent } from './announcement-form/announcement-form.component';
import { AnnouncementService } from './_services/announcement.service';
import { AuthService } from './_services/auth.service';
import { EventService } from './_services/event.service';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        CourseManagementComponent,
        AlertComponent,
        CourseComponent,
        HomeComponent,
        AnnouncementFormComponent,
        AnnouncementComponent,
        AnnouncementListComponent
    ],
    providers: [
        { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        AnnouncementService,
        AuthService,
        EventService,
        // provider used to create fake backend
        //fakeBackendProvider,
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add this if you use custom elements
})
export class AppModule { }
