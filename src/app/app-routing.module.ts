import { NgModule, importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ResetComponent } from './components/reset/reset.component';
import { TableComponent } from './components/table/table.component';
import { CustomerformComponent } from './components/customerform/customerform.component';
import { DeviceformComponent } from './components/deviceform/deviceform.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'reset', component: ResetComponent},
  {path: 'table', component: TableComponent, canActivate:[AuthGuard]},
  {path: 'createCustomer', component: CustomerformComponent},
  {path: 'registerDevice', component: DeviceformComponent},
  { path: 'register-device/:customerId', component: DeviceformComponent },
  { path: 'navbar', component: NavbarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
