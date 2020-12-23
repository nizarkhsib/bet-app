import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MatchesComponent } from './components/matches/matches.component';
import { PanierComponent } from './components/panier/panier.component';
import { RegisterComponent } from './components/register/register.component';
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
