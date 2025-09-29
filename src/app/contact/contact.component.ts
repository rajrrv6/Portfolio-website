// src/app/contact/contact.component.ts

import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  isSubmitted = false;
  isLoading = false;

  constructor() {}

  async onSubmit() {
    if (this.contactForm.invalid) return;

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
      setTimeout(() => (this.isSubmitted = false), 3000);
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Could not send message. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }

  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get message() { return this.contactForm.get('message'); }
}