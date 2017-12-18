import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddNewEventPage } from './add-new-event';

@NgModule({
  declarations: [
    AddNewEventPage,
  ],
  imports: [
    IonicPageModule.forChild(AddNewEventPage),
  ],
})
export class AddNewEventPageModule {}
