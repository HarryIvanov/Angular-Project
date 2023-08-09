import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from '../not-found/not-found.component';


const routes: Routes = [
  
  { 
    path: 'login',
    component: LoginComponent,

  },
  { 
    path: 'register',
    component: RegisterComponent,


  },
  { 
    path: 'profile',
    component: ProfileComponent,


  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
