import { Component, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationsService } from '../services/animations.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements AfterViewInit {
  @ViewChild('skillsContainer') skillsContainer!: ElementRef;
  @ViewChildren('skillCategory') skillCategories!: QueryList<ElementRef>;

  constructor(private animations: AnimationsService) {}

  ngAfterViewInit() {
    // Animate container
    this.animations.animateElement(this.skillsContainer, { delay: 0.3 });

    // Animate each category (without using document)
    this.animations.animateElements(this.skillCategories.toArray(), { delay: 0.5 });
    
    // Animate the tags in the "Other Competencies" section
    this.animations.animateStaggerElements('.other-skills .tags-wrapper span', { delay: 0.7 });
  }

  skills = [
    { category: 'Frontend', items: [
      { name: 'Angular', level: 90, icon: '⚛️' },
      { name: 'React', level: 85, icon: '⚡' },
      { name: 'TypeScript', level: 88, icon: '✏️' },
      { name: 'HTML/CSS', level: 95, icon: '🎨' }
    ]},
    { category: 'Backend', items: [
      { name: 'Spring Boot', level: 85, icon: '🍃' }, // Node.js ko Spring Boot se replace kiya gaya hai
      { name: 'Python', level: 80, icon: '🐍' },
      { name: 'Java', level: 75, icon: '☕' },
      { name: 'SQL', level: 82, icon: '🗃️' }
    ]},
    { category: 'DevOps & Tools', items: [
      { name: 'Docker', level: 78, icon: '🐳' },
      { name: 'Git', level: 90, icon: '🔀' },
      { name: 'AWS', level: 72, icon: '☁️' },
      { name: 'VS Code', level: 95, icon: '💻' }
    ]}
  ];
}