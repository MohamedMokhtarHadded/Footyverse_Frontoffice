import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InjuryModuleRoutingModule } from './injury-module-routing.module';
import { MedicalHistoryComponent } from './medical-history/medical-history.component';
import { IndexComponent } from './index/index.component';
import { AddInjuryComponent } from './add-injury/add-injury.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditInjuryComponent } from './edit-injury/edit-injury.component';
import { ViewInjuryComponent } from './view-injury/view-injury.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ManageInjuriesComponent } from './manage-injuries/manage-injuries.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewInjuriesComponent } from './view-injuries/view-injuries.component';
import { PdfInjuriesComponent } from './pdf-injuries/pdf-injuries.component';
import { InjuryCalenderComponent } from './injury-calender/injury-calender.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AddRecoveryComponent } from './add-recovery/add-recovery.component';
import { ViewRecoveryPlansComponent } from './view-recovery-plans/view-recovery-plans.component';
import { TipsComponent } from './tips/tips.component';


@NgModule({
  declarations: [
    MedicalHistoryComponent,
    IndexComponent,
    AddInjuryComponent,
    EditInjuryComponent,
    ViewInjuryComponent,
    ManageInjuriesComponent,
    DeleteModalComponent,
    ManageInjuriesComponent,
    ViewInjuriesComponent,
    PdfInjuriesComponent,
    InjuryCalenderComponent,
    AddRecoveryComponent,
    ViewRecoveryPlansComponent,
    TipsComponent,
    
  ],
  imports: [
    CommonModule,
    InjuryModuleRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    FullCalendarModule

  ]
})
export class InjuryModuleModule { }
