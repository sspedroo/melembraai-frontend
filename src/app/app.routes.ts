import { Routes } from '@angular/router';
import { TermsComponent } from './pages/terms/terms.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'terms', component: TermsComponent},
    {path: 'about', component: AboutComponent},
];
