import { Component, OnInit } from '@angular/core';
import { CourseService } from '@app/_services';
import { Course } from '@app/_models';

@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css']
})
export class CourseManagementComponent implements OnInit {
  courses: Course[] = [];
  course: Course = { title: '', description: '', duration: 0 };

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  createCourse(): void {
    this.courseService.createCourse(this.course).subscribe(createdCourse => {
      this.courses.push(createdCourse); // Add the newly created course to the list
      this.course = { title: '', description: '', duration: 0 }; // Reset form fields
    });
  }

  deleteCourse(courseId: number): void {
    this.courseService.deleteCourse(courseId).subscribe(() => {
      this.loadCourses(); // Reload the courses after deletion
    });
  }
}
