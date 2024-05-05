import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { ViewTeamComponent } from './view-team/view-team.component';

const routes: Routes = [
  {path: '',component:IndexComponent, children: [
    { path: '', redirectTo:'addInjury', pathMatch: 'full'},
    { path: 'view-team', component: ViewTeamComponent },
    { path: 'player-details/:id', component: PlayerDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamModuleRoutingModule { }
