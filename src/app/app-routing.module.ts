import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionComponent } from './permissions/permissions.component';
import { CandidateComponent } from './candidate/candidate.component';
import { ReportsComponent } from './reports/reports.component';
import { JobComponent } from './job/job.component';
import { HireComponent } from './hire/hire.component';
import { DepartmentsComponent } from './departments/departments.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'permissions', pathMatch: 'full' },
      { path: 'permissions', component: PermissionComponent },
      { path: 'candidate', component: CandidateComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'job', component: JobComponent },
      { path: 'hire', component: HireComponent },
      { path: 'department', component: DepartmentsComponent },
      { path: 'settings', component: SettingsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }