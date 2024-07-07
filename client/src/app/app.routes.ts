import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConnectionInitComponent } from './connection-init/connection-init.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: ConnectionInitComponent,
        title: 'Connection Init'
    },
    {
        path: 'home',
        component: HomeComponent,
        title: 'Home',
        canActivate : [authGuard]
    }
];
