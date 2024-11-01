import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ConorFormComponent } from './conor-form/conor-form.component';

export const routes: Routes = [
    { path: '', component: AppComponent },  // Default route
    { path: 'conor-form', component: ConorFormComponent },
];
