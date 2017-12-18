import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ServerServiceProvider {

  data: any;
  host: string;

  constructor(public http: HttpClient) {
    this.host = 'http://ec2-52-14-115-101.us-east-2.compute.amazonaws.com:3000/api/events'

  }

  getEvents() {
    console.log("getEvents()");
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.http.get(this.host)
        .toPromise()
        .then(data => {
          console.log("provider", data);
          this.data = data;
          resolve(this.data);
        });
    });
  }



  createEvent() {
    let event = {
      "name": "test z serwisu",
      "place": "test z serwisu"
    }
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    if (event)
      this.http.post(this.host, event, { headers: headers })
        .subscribe(res => {
          console.log(res);
        });

  }

  deleteEvent(id) {

    this.http.delete(this.host + '/' + id).subscribe((res) => {
      //  console.log(res.json());
    });

  }

}
