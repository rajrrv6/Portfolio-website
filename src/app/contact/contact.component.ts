import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

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

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (this.contactForm.invalid) return;

    this.isLoading = true;
    
    const apiUrl = '/api/send-email';

    const formData = this.contactForm.value;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(apiUrl, formData, { headers })
      .pipe(
        catchError(error => {
          console.error('Error sending message:', error);
          this.isLoading = false;
          return throwError(() => new Error('Could not send message. Please try again.'));
        })
      )
      .subscribe(() => {
        this.isLoading = false;
        this.isSubmitted = true;
        this.contactForm.reset();
        setTimeout(() => this.isSubmitted = false, 3000);
      });
  }

  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get message() { return this.contactForm.get('message'); }
}