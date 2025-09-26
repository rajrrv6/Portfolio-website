import { Component, AfterViewInit, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements AfterViewInit {
  @ViewChildren('projectCard') projectCards!: QueryList<ElementRef>;

  projects = [
    {
      title: 'AI-Powered Resume Builder',
      description: 'Next-gen resume builder using NLP to optimize content for ATS',
      tags: ['React', 'Node.js', 'NLP', 'MongoDB'],
      image: 'https://placehold.co/600x400/gray/white?text=AI+Resume+Builder',
      demo: '#',
      code: '#'
    },
    {
      title: 'E-Commerce Analytics Dashboard',
      description: 'Real-time sales analytics platform for e-commerce businesses',
      tags: ['Angular', 'D3.js', 'Firebase', 'Chart.js'],
      image: 'https://placehold.co/600x400/gray/white?text=E-Commerce+Analytics',
      demo: '#',
      code: '#'
    },
    {
      title: 'Personal Portfolio Website',
      description: 'A responsive portfolio website to showcase my work and skills',
      tags: ['Angular', 'GSAP', 'AOS'],
      image: 'https://placehold.co/600x400/gray/white?text=Portfolio+Website',
      demo: '#',
      code: '#'
    }
  ];

  ngAfterViewInit() {
    if (this.projectCards && this.projectCards.length > 0) {
      gsap.from(this.projectCards.map(card => card.nativeElement), {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.5
      });
    }
  }
}
