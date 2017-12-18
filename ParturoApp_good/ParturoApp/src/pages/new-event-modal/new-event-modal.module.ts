import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewEventModalPage } from './new-event-modal';

@NgModule({
  declarations: [
    NewEventModalPage,
  ],
  imports: [
    IonicPageModule.forChild(NewEventModalPage),
  ],
})
export class NewEventModalPageModule {}
