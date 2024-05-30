import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService, CourseService, AlertService } from '@app/_services';

@Component({
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  account = this.accountService.accountValue;
  courses: any[] = [];
  filteredCourses: any[] = [];
  searchQuery: string = '';
  selectedCategory: string = 'All';
  priceRange: string = 'All';

  constructor(
    private accountService: AccountService, 
    private router: Router, 
    private courseService: CourseService, 
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getAllCourses().subscribe({
      next: courses => {
        this.courses = courses;
        this.filteredCourses = courses; // Initialize filtered events
      },
      error: error => this.alertService.error(error)
    });
  }

  filterCourses() {
    let filteredCourses = this.courses;

    // Filter by search query
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filteredCourses = filteredCourses.filter(course =>
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query)
      );
    }

    this.filteredCourses = filteredCourses;
  }
}