import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { CalendarComponent } from './features/calendar/calendar';

export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: 'calendar',
        component: CalendarComponent
    }
];
