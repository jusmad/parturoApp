import { Component } from "@angular/core";
import { NavController, ModalController } from 'ionic-angular';
import { AddNewEvent } from '../add-new-event/add-new-event';
import { Events } from '../../providers/events/events';
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
 
  events: any;
 
  constructor(public nav: NavController, public eventService: Events, public modalCtrl: ModalController) {
 
  }
 
  ionViewDidLoad(){
 
    this.eventService.getEvents().then((data) => {
      console.log(data);
      this.events = data;
    });
 
  }
 
  addEvent(){
 
    let modal = this.modalCtrl.create(AddNewEvent);
 
    modal.onDidDismiss(event => {
      if(event){
        this.events.push(event);
        this.eventService.createEvent(event);       
      }
    });
 
    modal.present();
 
  }
 
  deleteEvent(event){
 
    //Remove locally
      let index = this.events.indexOf(event);
 
      if(index > -1){
        this.events.splice(index, 1);
      }  
 
    //Remove from database
    this.eventService.deleteEvent(event._id);
  }
 
}