import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class Events {
 
  data: any;
 
  constructor(public http: Http) {
    this.data = null;
  }
 
  getEvents(){
 
    if (this.data) {
      return Promise.resolve(this.data);
    }
 
    return new Promise(resolve => {
 
      this.http.get('http://localhost:8080/api/events')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }
 
  createEvent(event){
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
 
    this.http.post('http://localhost:8080/api/events', JSON.stringify(event), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });
 
  }
 
  deleteEvent(id){
 
    this.http.delete('http://localhost:8080/api/events/' + id).subscribe((res) => {
      console.log(res.json());
    });   
 
  }
 
}