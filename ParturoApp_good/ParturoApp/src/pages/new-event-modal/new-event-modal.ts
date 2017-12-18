import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServerServiceProvider } from '../../providers/server-service/server-service';


/**
 * Generated class for the NewEventModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-event-modal',
  templateUrl: 'new-event-modal.html',
})
export class NewEventModalPage {

  name: string;
  place: string;
  date: Date;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private eventService: ServerServiceProvider) {
  }

  ionViewDidLoad() {
    this.eventService.createEvent();
  }

}
