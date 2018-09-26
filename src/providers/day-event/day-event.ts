import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Calendar } from '@ionic-native/calendar';


/*
  Generated class for the DayEventProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DayEventProvider {

  constructor(public http: HttpClient,
    private _Calendar: Calendar) {

  }
  getdayevent() {
    
    this._Calendar.requestReadPermission();
    var dateObj = new Date();
    var month = dateObj.getUTCMonth(); //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var hour = dateObj.getUTCHours() + 1;
    var minute = dateObj.getUTCMinutes();
    let calender = this._Calendar;
    //var startDate = year + "," + month + "" + day;

    return new Promise(function(resolve, reject) {
      
      var startDate = new Date(year, month, day); // beware: month 0 = january, 11 = december
      var endDate = new Date(year, month, day + 1);
      calender.listEventsInRange(startDate, endDate).then((res:Array<Event_description>) => {
        
        if(res.length > 0){
          
        res.forEach(function(event) {
          let startEvent= event.dtstart;
          let endEvent = event.dtend;
         
          if (startEvent <= Date.now() && Date.now() <= endEvent) {
            if(event.title){
              
              resolve(event.title);}
            else{
              
              resolve('No Event Currently');}
          }else{
            resolve('No Event Currently');
          }

        });
      }else{
        
          resolve('No Event Currently');
      }

      });
    })

  }

}

interface Event_description{
  allDay:number,
  calendar_id:string,
  dtend:number,
  dtstart:number,
  eventLocation:string,
  event_id:string,
  id:string,
  title:string
}
