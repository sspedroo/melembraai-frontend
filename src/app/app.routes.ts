import { Routes } from '@angular/router';
import { TermsComponent } from './pages/terms/terms.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RegisterComponent } from './pages/register/register.component';
import { ConfirmRegisterComponent } from './pages/confirm-register/confirm-register.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'terms', component: TermsComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'confirm-email', component: ConfirmRegisterComponent},
];
