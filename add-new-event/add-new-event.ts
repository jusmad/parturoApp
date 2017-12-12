import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
 
@Component({
  selector: 'add-new-event',
  templateUrl: 'add-new-event.html'
})
export class AddNewEvent {
 
  name: any;
  place: any;
  date: any;
 
  constructor(public viewCtrl: ViewController) {
 
  }
 
  save(): void {
 
    let event = {
      name: this.name,
      place: this.place,
      date: this.date
    };
 
    this.viewCtrl.dismiss(event);
 
  }
 
  close(): void {
    this.viewCtrl.dismiss();
  }
}