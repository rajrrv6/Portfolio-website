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
    { icon: '🎓', title: 'Education', value: 'BTech CSE - Software Tech' },
    { icon: '🏫', title: 'University', value: 'Premier Tech University' },
    { icon: '📍', title: 'Location', value: 'Bangalore, India' },
    { icon: '💻', title: 'Focus', value: 'Full Stack Development' }
  ];

  timelineItems = [
    { year: '2023', title: 'Senior Developer', company: 'Tech Solutions Inc.', description: 'Led frontend development team and implemented architecture improvements' },
    { year: '2021', title: 'Junior Developer', company: 'Digital Creations', description: 'Built responsive UIs and contributed to backend APIs' },
    { year: '2020', title: 'Intern', company: 'Code Masters', description: 'Learned industry practices and assisted with testing' }
  ];
}
