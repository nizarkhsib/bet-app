import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectedCompetitionsComponent } from './modules/selected-competitions/selected-competitions.component';
import { HomeComponent } from './modules/home/home.component';
import { MatchesComponent } from './modules/matches/matches.component';
import { PanierComponent } from './modules/panier/panier.component';
import { RegisterComponent } from './modules/user/register/register.component';
import { AuthGuard } from './shared/helpers/auth.guard';
import { LoginComponent } from './modules/user/login/login.component';


const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'competitions', // child route path
                component: SelectedCompetitionsComponent, // child route component that the router renders
            }
        ]
    },
    {
        path: 'matches/:competitionId', // child route path
        component: MatchesComponent, // child route component that the router renders
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'panier',
        component: PanierComponent,
    },
    {
        path: 'profile',
        loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
        canActivate: [AuthGuard]
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
