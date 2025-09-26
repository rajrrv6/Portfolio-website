import { Injectable, ElementRef } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({ providedIn: 'root' })
export class AnimationsService {
  private cleanupCursor: (() => void) | null = null;

  constructor() {
    gsap.registerPlugin(ScrollTrigger);
  }

  // ---------------- Cursor ----------------
  initCursorEffect() {
    if (typeof document === 'undefined') return;
    if (this.cleanupCursor) return;

    const cursor = document.createElement('div');
    const follower = document.createElement('div');
    cursor.className = 'custom-cursor';
    follower.className = 'custom-cursor-follower';
    document.body.appendChild(cursor);
    document.body.appendChild(follower);

    const mouseMoveHandler = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.3 });
    };
    document.addEventListener('mousemove', mouseMoveHandler);

    const mouseEnterHandler = () => {
      gsap.to(cursor, { scale: 1.5, duration: 0.2 });
      gsap.to(follower, { width: 60, height: 60, duration: 0.3 });
    };
    const mouseLeaveHandler = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(follower, { width: 40, height: 40, duration: 0.3 });
    };

    const hoverSelectors = ['a', 'button', '.interactive', 'input', 'textarea'];
    hoverSelectors.forEach(s => {
      document.querySelectorAll(s).forEach(el => {
        el.addEventListener('mouseenter', mouseEnterHandler);
        el.addEventListener('mouseleave', mouseLeaveHandler);
      });
    });

    this.cleanupCursor = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      hoverSelectors.forEach(s => {
        document.querySelectorAll(s).forEach(el => {
          el.removeEventListener('mouseenter', mouseEnterHandler);
          el.removeEventListener('mouseleave', mouseLeaveHandler);
        });
      });
      cursor.remove();
      follower.remove();
      this.cleanupCursor = null;
    };
  }

  destroyCursorEffect() {
    if (this.cleanupCursor) this.cleanupCursor();
  }

  // ---------------- Scroll Animations ----------------
  setupScrollAnimations() {
    if (typeof document === 'undefined') return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('aos-animate');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
  }

  // ---------------- Element Animations ----------------
  animateElement(element: ElementRef | HTMLElement, options: any = {}) {
    if (typeof window === 'undefined') return;
    const el = element instanceof ElementRef ? element.nativeElement : element;
    gsap.from(el, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
      delay: options.delay || 0
    });
  }

  animateElements(elements: (ElementRef | HTMLElement)[], options: any = {}) {
    if (typeof window === 'undefined') return;
    const nativeEls = elements.map(el => el instanceof ElementRef ? el.nativeElement : el);
    gsap.from(nativeEls, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out',
      delay: options.delay || 0
    });
  }

  animateStaggerElements(selector: string, options: any = {}) {
    if (typeof document === 'undefined') return;
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;
    return gsap.from(elements, {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.6,
      ease: 'back.out(1.7)',
      ...options
    });
  }

  animateHeroSection(elementRef?: ElementRef) {
    if (typeof document === 'undefined') return;
    const element = elementRef?.nativeElement || document.querySelector('.hero-section') as HTMLElement | null;
    if (!element) return;

    gsap.from(element, { opacity: 0, y: 50, duration: 1.2, ease: 'power3.out' });
    gsap.from(element.querySelectorAll('h1, p, .cta'), {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.8,
      delay: 0.3,
      ease: 'back.out(1.7)'
    });
  }
}
