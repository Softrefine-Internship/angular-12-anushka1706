import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PermissionComponent } from './permissions/permissions.component';
import { ReportsComponent } from './reports/reports.component';
import { JobComponent } from './job/job.component';
import { HireComponent } from './hire/hire.component';
import { CandidateComponent } from './candidate/candidate.component';
import { SettingsComponent } from './settings/settings.component';
import { DepartmentsComponent } from './departments/departments.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PermissionComponent,
    ReportsComponent,
    JobComponent,
    HireComponent,
    CandidateComponent,
    SettingsComponent,
    DepartmentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    MatExpansionModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
