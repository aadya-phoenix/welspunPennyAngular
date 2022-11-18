import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AddUserComponent } from './add-user/add-user.component';
import { VerificationReportComponent } from './verification-report/verification-report.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'',component:DashboardComponent},
  {path:'verify',component:VerifyAccountComponent},
  {path:'report',component:VerificationReportComponent},
  {path:'user',component:UserComponent},
  {path:'add',component:AddUserComponent},
  {path:'edit/:id',component:AddUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
