import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';
import { AnimationsService } from '../services/animations.service';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements AfterViewInit {
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  @ViewChildren('infoCard') infoCards!: QueryList<ElementRef>;
  
  isSubmitted = false;
  isLoading = false;
  isError = false; // Added new state for error handling

  constructor(private animations: AnimationsService) {}

  ngAfterViewInit() {
    this.animations.animateStaggerElements('.contact-form .form-group', { delay: 0.3 });
    this.animations.animateElements(this.infoCards.toArray(), { delay: 0.5 });
  }

  async onSubmit() {
    if (this.contactForm.invalid) return;

    // Reset feedback states
    this.isError = false; 
    this.isLoading = true;

    try {
      emailjs.init('erZRSioxHJhaHTnCK');

      const response = await emailjs.send(
        'service_gw2derc',
        'template_ehkmw6p',
        {
          // Change the keys here to match your template variables
          name: this.contactForm.value.name,
          email: this.contactForm.value.email,
          message: this.contactForm.value.message,
        }
      );

      console.log('Email sent successfully:', response);
      this.isSubmitted = true;
      this.contactForm.reset();
      // Use requestAnimationFrame before timeout to ensure UI update
      requestAnimationFrame(() => {
        setTimeout(() => (this.isSubmitted = false), 3000);
      });
      
    } catch (error) {
      console.error('Failed to send email:', error);
      this.isError = true; // Set error state on failure
      setTimeout(() => (this.isError = false), 5000);
    } finally {
      this.isLoading = false;
    }
  }

  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get message() { return this.contactForm.get('message'); }
}
