import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../_services/announcement.service';
import { Announcement } from '../_models/announcement';

@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.css']
})
export class AnnouncementListComponent implements OnInit {
  announcements: Announcement[] = [];

  constructor(private announcementService: AnnouncementService) {}

  ngOnInit(): void {
    this.loadAnnouncement();
  }

  loadAnnouncement(): void {
    this.announcementService.getAllAnnouncements().subscribe(data => {
      this.announcements = data;
    });
  }

  deleteAnnouncement(announcementId: number): void {
    this.announcementService.deleteAnnouncement(announcementId).subscribe(() => {
      this.loadAnnouncement(); // Reload the courses after deletion
    });
  }
}
