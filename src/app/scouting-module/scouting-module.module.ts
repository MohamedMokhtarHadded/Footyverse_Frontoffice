import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddScoutingComponent } from './add-scouting/add-scouting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScoutingRoutingModule } from './scouting-routing.module';
import { IndexComponent } from './index/index.component';
import { ViewScoutingComponent } from './view-scouting/view-scouting.component';
import { DeleteScoutingComponent } from './delete-scouting/delete-scouting.component';
import { UpdateScoutingComponent } from './update-scouting/update-scouting.component';
import { DetailScoutingComponent } from './detail-scouting/detail-scouting.component';
import { MatCardModule } from '@angular/material/card';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';



@NgModule({
  declarations: [
    AddScoutingComponent,
    IndexComponent,
    ViewScoutingComponent,
    DeleteScoutingComponent,
    UpdateScoutingComponent,
    DetailScoutingComponent,
    CalendarComponent,
    
  
    
  ],
  imports: [
    FullCalendarModule,
    
    ReactiveFormsModule,
    ScoutingRoutingModule,
    FormsModule,
    CommonModule,
    MatCardModule, // Import CommonModule instead of BrowserModule
    
  ]
})
export class ScoutingModuleModule { 
  
}
