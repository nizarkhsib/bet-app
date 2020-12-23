import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoMaterialModule } from './components/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { MatchesComponent } from './components/matches/matches.component';
import { HomeComponent } from './components/home/home.component';
import { CompetitionSelectionComponent } from './components/competition-selection/competition-selection.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PanierComponent } from './components/panier/panier.component';
import { MatIconModule } from '@angular/material/icon';
import { DateHeaderComponent } from './components/matches/date-header/date-header.component';
import { TeamBoxComponent } from './components/matches/team-box/team-box.component';
import { HeaderService } from './components/matches/header.service';
import { SportService } from './shared/services/sport.service';
import { CompetitionsService } from './shared/services/competitions.service';
import { MatchesService } from './shared/services/matches.services';

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
        TeamBoxComponent
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
    providers: [SportService, CompetitionsService, MatchesService, HeaderService],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
