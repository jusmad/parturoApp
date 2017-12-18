import { Component } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import { NewEventModalPage } from '../new-event-modal/new-event-modal'
import { ServerServiceProvider } from '../../providers/server-service/server-service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  events: any;
  // eventsProvider: ServerServiceProvider;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              private eventsProvider: ServerServiceProvider) {
      eventsProvider.getEvents()
      .then(
        (data)=>{
          this.events = data;
          console.log(this.events);
        }
      )

  }

  public addEvent() {
    console.log("hejka");
  }

  public openNewEventModal() {
    let myModal = this.modalCtrl.create(NewEventModalPage);
    myModal.present();
  }


}
