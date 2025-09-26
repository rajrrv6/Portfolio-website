import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { AnimationsService } from './app/services/animations.service';


// Initialize before bootstrapping
const animationService = new AnimationsService();


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
