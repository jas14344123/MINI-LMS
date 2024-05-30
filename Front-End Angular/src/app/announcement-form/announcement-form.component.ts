import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AnnouncementService } from '../_services/announcement.service'; // Corrected import path
import { Announcement } from '../_models/announcement'; // Corrected import path

@Component({
  selector: 'app-announcement-form',
  templateUrl: './announcement-form.component.html',
  styleUrls: ['./announcement-form.component.css']
})
export class AnnouncementFormComponent implements OnInit {
  title: string = '';
  content: string = '';
  isAdmin: boolean = false;
  announcements: Announcement[] = [];

  constructor(private authService: AuthService, private announcementService: AnnouncementService) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadAnnouncements();
  }

  loadAnnouncements(): void {
    this.announcementService.getAllAnnouncements().subscribe(data => {
      this.announcements = data;
    });
  }

  addAnnouncement(): void {
    if (this.title && this.content) {
      const newAnnouncement: Announcement = {
        title: this.title,
        content: this.content
      };
      this.announcementService.createAnnouncement(newAnnouncement).subscribe(createdAnnouncement => {
        // Add the new announcement to the list and reset form fields
        this.announcements.push(createdAnnouncement);
        this.title = '';
        this.content = '';
      });
    }
  }
}
