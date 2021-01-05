import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { SportService } from './shared/services/sport.service';
import { CompetitionsService } from './shared/services/competitions.service';
import { MatchesService } from './shared/services/matches.services';
import { ConfirmDialogComponent } from './modules/confirm-dialog/confirm-dialog.component';
import { BarChartComponent } from './modules/bar-chart/bar-chart.component';
import { MatchesComponent } from './modules/matches/matches.component';
import { HomeComponent } from './modules/home/home.component';
import { CompetitionSelectionComponent } from './modules/competition-selection/competition-selection.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { PanierComponent } from './modules/panier/panier.component';
import { DateHeaderComponent } from './modules/matches/date-header/date-header.component';
import { TeamBoxComponent } from './modules/matches/team-box/team-box.component';
import { DemoMaterialModule } from './modules/material-module';
import { HeaderService } from './shared/services/header.service';
import { HeaderComponent } from './modules/header/header.component';

@NgModule({
    declarations: [
        AppComponent,
        ConfirmDialogComponent,
        BarChartComponent,
        MatchesComponent,
        HomeComponent,
        CompetitionSelectionComponent,
        LoginComponent,
        RegisterComponent,
        PanierComponent,
        DateHeaderComponent,
        TeamBoxComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        AppRoutingModule,
        DemoMaterialModule,
        ChartsModule,
        MatIconModule
    ],
    providers: [
        SportService,
        CompetitionsService,
        MatchesService,
        HeaderService],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
