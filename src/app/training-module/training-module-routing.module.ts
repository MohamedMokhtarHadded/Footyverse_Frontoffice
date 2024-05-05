import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTrainingComponent } from './add-training/add-training.component';
import { IndexComponent } from './index/index.component';
import { EditTrainingComponent } from './edit-training/edit-training.component';
import { ViewTrainingComponent } from './view-training/view-training.component';
import { ManageTrainingComponent } from './manage-training/manage-training.component';
import { CalenderTrainingComponent } from './calender-training/calender-training.component';
import { CalendarTComponent } from './calendar-t/calendar-t.component';

const routes: Routes = [
  {path: '',component:IndexComponent, children: [
    { path: '', redirectTo:'addTraining', pathMatch: 'full'},
    { path: 'addTraining', component: AddTrainingComponent },  
    { path: 'editTraining/:id', component: EditTrainingComponent },
    { path: 'viewTraining/:id', component: ViewTrainingComponent},
    { path: 'manageTrainings', component: ManageTrainingComponent},
    { path: 'calenderTraining', component: CalendarTComponent}
    
  ]}
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingModuleRoutingModule { }
