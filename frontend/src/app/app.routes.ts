import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ConorFormComponent } from './conor-form/conor-form.component';
import { StressFormComponent } from './stress-form/stress-form.component';
import { LightupIntroComponent } from './lightup-intro/lightup-intro.component';
import { IntroComponent } from './intro/intro.component';
import { ConclusionComponent } from './conclusion/conclusion.component';

export const routes: Routes = [
    { path: '', component: IntroComponent},
    { path: 'intro', component: IntroComponent},
    { path: 'lightup-intro', component: LightupIntroComponent },  // Default route
    { path: 'conor-form', component: ConorFormComponent },
    { path: 'stress-form', component: StressFormComponent },
    { path: 'conclusion', component: ConclusionComponent}
];
