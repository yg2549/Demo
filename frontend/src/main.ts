import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ConorFormComponent } from './app/questionnaire/conor-form/conor-form.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
