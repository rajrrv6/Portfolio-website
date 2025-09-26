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
  }
}
