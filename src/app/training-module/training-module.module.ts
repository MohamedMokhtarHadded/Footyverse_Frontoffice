
import { AddTrainingComponent } from './add-training/add-training.component';
import { IndexComponent } from './index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EditTrainingComponent } from './edit-training/edit-training.component';
import { ViewTrainingComponent } from './view-training/view-training.component';
import { ManageTrainingComponent } from './manage-training/manage-training.component';
import { NgModule } from '@angular/core';
import { TrainingModuleRoutingModule } from './training-module-routing.module';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CalenderTrainingComponent } from './calender-training/calender-training.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarTComponent } from './calendar-t/calendar-t.component';



@NgModule({
  declarations: [
    AddTrainingComponent,
    IndexComponent,
    EditTrainingComponent,
    ViewTrainingComponent,
    ManageTrainingComponent,
    CalenderTrainingComponent,
    CalendarTComponent
  ],
  imports: [
    CommonModule,
    TrainingModuleRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatCheckboxModule,
    FullCalendarModule

  ]
})
export class TrainingModuleModule { }
