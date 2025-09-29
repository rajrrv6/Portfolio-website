import { Component, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationsService } from '../services/animations.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('aboutContainer') aboutContainer!: ElementRef;
  @ViewChildren('detailItem') detailItems!: QueryList<ElementRef>;
  @ViewChildren('timelineItem') timelineItemsQuery!: QueryList<ElementRef>;

  constructor(private animations: AnimationsService) {}

  ngAfterViewInit() {
    this.animations.animateElement(this.aboutContainer, { delay: 0.3 });
    this.animations.animateElements(this.detailItems.toArray(), { delay: 0.5 });
    this.animations.animateElements(this.timelineItemsQuery.toArray(), { delay: 0.7 });
  }

  personalDetails = [
    { icon: 'assets/Education_logo.jpg', alt: 'Education icon', title: 'Education', value: 'B.Tech in Computer Science & Engineering' },
    { icon: 'assets/cutm.png', alt: 'University icon', title: 'University', value: 'Centurion University of Technology and Management Odisha' },
    { icon: 'assets/findMe.png', alt: 'Location icon', title: 'Location', value: 'Muzaffarpur, Bihar, India' },
    { icon: 'assets/fullStack.jpg', alt: 'Focus icon', title: 'Focus', value: 'Full Stack Development' }
  ];

  timelineItems = [
    { year: '2025', title: 'Intern', company: 'INFOTACT Solutions', description: 'Participated in an industrial training program, gaining hands-on experience in full-stack web development. Applied industry-standard practices, including version control (Git), debugging, and requirement analysis, to contribute to project life cycles.' },
    { year: '2024', title: 'Project Developer', company: 'Self', description: 'Developed a Smart Farming System using Spring Boot and Angular to assist farmers in managing crops efficiently and built a full-featured book inventory management web application using Spring Boot and MySQL.' },
    { year: '2022', title: 'Student', company: 'University', description: 'Began B.Tech in Computer Science & Engineering at Centurion University of Technology and Management Odisha.' }
  ];
}