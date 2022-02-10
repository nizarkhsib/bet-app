import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { DemoMaterialModule } from '../material-module';
import { FriendsComponent } from './profile/friends/friends.component';



@NgModule({
    declarations: [
        ProfileComponent,
        FriendsComponent
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        DemoMaterialModule
    ]
})
export class ProfileModule { }
