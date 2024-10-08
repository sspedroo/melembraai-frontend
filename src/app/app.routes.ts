import { Routes } from '@angular/router';
import { TermsComponent } from './pages/terms/terms.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RegisterComponent } from './pages/register/register.component';
import { ConfirmRegisterComponent } from './pages/confirm-register/confirm-register.component';
import { LoginComponent } from './pages/login/login.component';
import { LoggedHomeComponent } from './pages/logged-home/logged-home.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},// A landing page
    {path: 'terms', component: TermsComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'confirm-email', component: ConfirmRegisterComponent},
    {path: 'home', component: LoggedHomeComponent}, //the logged-in home page
];
