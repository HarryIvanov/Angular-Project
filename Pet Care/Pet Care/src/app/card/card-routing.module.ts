import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { CreateCardComponent } from './create-card/create-card.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit-card/edit/edit.component';


const routes: Routes = [
  {
    path:'dashboard',
    children: [
        {
            path:'',
            pathMatch: 'full',
            component: MainComponent,
           
        },
        {
            path: ':cardId',
            component: DetailsComponent,
            
        }
    ],
  },
  {
    path:'create-card',
    component: CreateCardComponent,

  },
  {
    path: 'dashboard/:cardId/edit-card/:cardId',
    component: EditComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardRoutingModule {}