import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddScoutingComponent } from './scouting-module/add-scouting/add-scouting.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./template/template.module').then(m => m.TemplateModule) },
  { path: 'user', loadChildren: () => import('./user-module/user-module.module').then(m => m.UserModuleModule) },
  { path: 'communication', loadChildren: () => import('./communication-module/communication-module.module').then(m => m.CommunicationModuleModule) },
  { path: 'injury', loadChildren: () => import('./injury-module/injury-module.module').then(m => m.InjuryModuleModule) },
  { path: 'training', loadChildren: () => import('./training-module/training-module.module').then(m => m.TrainingModuleModule) },
  { path: 'performance', loadChildren: () => import('./performance-module/performance-module.module').then(m => m.PerformanceModuleModule) },
  { path: 'scouting', loadChildren: () => import('./scouting-module/scouting-module.module').then(m => m.ScoutingModuleModule) },
  { path: 'team', loadChildren: () => import('./team-module/team-module.module').then(m => m.TeamModuleModule) },
  

];

@NgModule({
  declarations: [
  
      
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
