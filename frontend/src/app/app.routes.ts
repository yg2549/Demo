import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ConorFormComponent } from './conor-form/conor-form.component';
import { StressFormComponent } from './stress-form/stress-form.component';
import { IntroComponent } from './intro/intro.component';

export const routes: Routes = [
    { path: '', component: IntroComponent },  // Default route
    { path: 'conor-form', component: ConorFormComponent },
    { path: 'stress-form', component: StressFormComponent },
];
