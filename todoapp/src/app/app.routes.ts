import { Routes } from '@angular/router';

import { HomeComponent } from './components/pages/home/home.component'
import { LabsComponent } from './components/pages/labs/labs.component'


export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'labs',
        component: LabsComponent
    },

];
