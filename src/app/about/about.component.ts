import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  personalDetails = [
    { icon: '🎓', title: 'Education', value: 'B.Tech in Computer Science & Engineering' },
    { icon: '🏫', title: 'University', value: 'Centurion University of Technology and Management Odisha' },
    { icon: '📍', title: 'Location', value: 'Muzaffarpur, Bihar, India' },
    { icon: '💻', title: 'Focus', value: 'Full Stack Development' }
  ];

  timelineItems = [
    { year: '2025', title: 'Intern', company: 'INFOTACT Solutions', description: 'Participated in an industrial training program, gaining hands-on experience in full-stack web development. Applied industry-standard practices, including version control (Git), debugging, and requirement analysis, to contribute to project life cycles.' },
    { year: '2024', title: 'Project Developer', company: 'Self', description: 'Developed a Smart Farming System using Spring Boot and Angular to assist farmers in managing crops efficiently and built a full-featured book inventory management web application using Spring Boot and MySQL.' },
    { year: '2022', title: 'Student', company: 'University', description: 'Began B.Tech in Computer Science & Engineering at Centurion University of Technology and Management Odisha.' }
  ];
}