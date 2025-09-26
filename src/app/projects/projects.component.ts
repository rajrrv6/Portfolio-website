import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {

  projects = [
    {
      title: 'Smart Farming System',
      description: 'IoT + AI based system for monitoring crops and soil health.',
      tags: ['Spring Boot', 'Angular', 'IoT', 'AI'],
      image: 'https://placehold.co/600x400/gray/white?text=Smart+Farming+System',
      demo: '#',
      code: '#'
    },
    {
      title: 'Plant Disease Detection',
      description: 'AI-powered system to detect plant leaf diseases.',
      tags: ['AI', 'CNN', 'Angular'],
      image: 'https://placehold.co/600x400/gray/white?text=Plant+Disease+Detection',
      demo: '#',
      code: '#'
    },
    {
      title: 'Books Management System',
      description: 'A full-featured book inventory management web application.',
      tags: ['Spring Boot', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
      image: 'https://placehold.co/600x400/gray/white?text=Books+Management+System',
      demo: '#',
      code: '#'
    },
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
    },
  ];
}