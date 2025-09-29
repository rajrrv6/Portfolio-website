import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AnimationsService } from '../services/animations.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('heroSection') heroSection!: ElementRef;

  constructor(private animations: AnimationsService) {}

  ngAfterViewInit() {
    this.animations.animateHeroSection(this.heroSection);
    
    // Animate the about section content
    this.animations.animateStaggerElements('.about-section h2', { delay: 0.5 });
    this.animations.animateStaggerElements('.about-section p', { delay: 0.7 });

    // Animate the projects section content
    this.animations.animateStaggerElements('.projects-preview h2', { delay: 0.9 });
    this.animations.animateStaggerElements('.project-card', { delay: 1.1 });
  }
}