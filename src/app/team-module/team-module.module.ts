import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamModuleRoutingModule } from './team-module-routing.module';
import { IndexComponent } from './index/index.component';
import { ViewTeamComponent } from './view-team/view-team.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IndexComponent,
    ViewTeamComponent,
    PlayerDetailsComponent
  ],
  imports: [
    CommonModule,
    TeamModuleRoutingModule,
    MatIconModule,
    FormsModule,
    
  ]
})
export class TeamModuleModule { }
