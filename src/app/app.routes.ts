import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { CalendarComponent } from './features/calendar/calendar';
import { authGuard } from './core/guards/auth.guard';
import { notAuthGuard } from './core/guards/not-auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: Login,
        canActivate: [notAuthGuard]
    },
    {
        path: 'calendar',
        component: CalendarComponent,
        canActivate: [authGuard]
    }
];
