import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseComponent } from './course';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { HomeComponent } from './home';
import { AnnouncementComponent } from './announcement';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);
const profileModule = () => import('./profile/profile.module').then(x => x.ProfileModule);
const CourseManagementModule = () => import('./course-management/course-management.module').then(x => x.CourseManagementModule);
const AnnouncementFormModule = () => import('./announcement-form/announcement-form.module').then(x => x.AnnouncementFormModule);


const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'course', component: CourseComponent, canActivate: [AuthGuard] },
    { path: 'announcement', component: AnnouncementComponent, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },
    { path: 'course-management', loadChildren: CourseManagementModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'announcement-form', loadChildren: AnnouncementFormModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }