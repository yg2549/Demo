import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ConorFormComponent } from './questionnaire/conor-form/conor-form.component';
import { StressFormComponent } from './questionnaire/stress-form/stress-form.component';
import { LightupIntroComponent } from './questionnaire/lightup-intro/lightup-intro.component';
import { IntroComponent } from './questionnaire/intro/intro.component';
import { ConclusionComponent } from './questionnaire/conclusion/conclusion.component';

export const routes: Routes = [
    { path: '', component: IntroComponent},
    { path: 'intro', component: IntroComponent},
    { path: 'lightup-intro', component: LightupIntroComponent },  // Default route
    { path: 'conor-form', component: ConorFormComponent },
    { path: 'stress-form', component: StressFormComponent },
    { path: 'conclusion', component: ConclusionComponent}
];
