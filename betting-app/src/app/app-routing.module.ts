import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { MatchesComponent } from './modules/matches/matches.component';
import { PanierComponent } from './modules/panier/panier.component';
import { RegisterComponent } from './modules/register/register.component';
import { AuthGuard } from './shared/helpers/auth.guard';


const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        // canActivate: [AuthGuard]
        // children : [
        //   {
        //     path: 'matches/:competitionId', // child route path
        //     component: MatchesComponent, // child route component that the router renders
        //   }
        // ]
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
        component: PanierComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
