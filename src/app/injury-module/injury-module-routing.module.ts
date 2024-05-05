import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInjuryComponent } from './add-injury/add-injury.component';
import { AddRecoveryComponent } from './add-recovery/add-recovery.component';
import { EditInjuryComponent } from './edit-injury/edit-injury.component';
import { IndexComponent } from './index/index.component';
import { InjuryCalenderComponent } from './injury-calender/injury-calender.component';
import { ManageInjuriesComponent } from './manage-injuries/manage-injuries.component';
import { MedicalHistoryComponent } from './medical-history/medical-history.component';
import { TipsComponent } from './tips/tips.component';
import { ViewInjuriesComponent } from './view-injuries/view-injuries.component';
import { ViewInjuryComponent } from './view-injury/view-injury.component';
import { ViewRecoveryPlansComponent } from './view-recovery-plans/view-recovery-plans.component';

const routes: Routes = [

  {path: '',component:IndexComponent, children: [
    { path: '', redirectTo:'addInjury', pathMatch: 'full'},
    { path: 'addInjury', component: AddInjuryComponent },  
    { path: 'editInjury/:id', component: EditInjuryComponent },
    { path: 'profile/:playerId', component: MedicalHistoryComponent},
    { path: 'viewInjury/:id', component: ViewInjuryComponent},
    { path: 'manageInjuries', component: ManageInjuriesComponent},
    { path: 'view-injuries', component: ViewInjuriesComponent},
    { path: 'injuries-calender', component: InjuryCalenderComponent},
    { path: 'add-recovery/:injuryId/:playerId', component: AddRecoveryComponent},
    { path: 'view-recovery-plans', component: ViewRecoveryPlansComponent},
    { path: 'prevent-injuries', component: TipsComponent},

    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InjuryModuleRoutingModule { }
