import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCardComponent } from './create-card/create-card.component';
import { DetailsComponent } from './details/details.component';
import { CardRoutingModule } from './card-routing.module';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit-card/edit/edit.component';




@NgModule({
  declarations: [
    CreateCardComponent,
    DetailsComponent,
    EditComponent,

    
  ],
  imports: [
    CommonModule,
    CardRoutingModule,
    FormsModule
  ]
})
export class CardModule { }
