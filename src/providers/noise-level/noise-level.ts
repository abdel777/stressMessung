import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DBMeter } from '@ionic-native/db-meter';
import { LocationProvider } from '../../providers/location/location';
/*
  Generated class for the NoiseLevelProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NoiseLevelProvider {

  constructor(public http: HttpClient,
    private _DBMETER: DBMeter,
    private _LOCATION: LocationProvider,) {
    //console.log('Hello NoiseLevelProvider Provider');
  }
  getnoislevel() {
    let noislevel = this._DBMETER;
    let dbCounter: number = 0;
    let dbList: Array<number>=[];
    let _THIS = this;
    return new Promise(function(resolve, reject) {
      let subscription = noislevel.start().subscribe(
        data => {
          dbList.push(data);
          dbCounter++;
          if (dbCounter > 10) {
            let VARnoilevel = _THIS._LOCATION.kalmanFilter(dbList);
            resolve(VARnoilevel);
            noislevel.stop();
          }
        }
      );

    });
  }

  /*getnoislevel() {
    let dbCounter: number;
    let dbList: number[];
    let noislevel = this._DBMETER;
    return new Promise(function(resolve, reject) {
      dbCounter = 0;
      noislevel.start().subscribe(

      );
      /*noislevel.start(function(db) {
          dbList.push(db);
          dbCounter++;
          if (dbCounter > 10) {
              noislevel.stop(function() {
                console.log("DBMeter well stopped");
              }, function(e) {
                console.log('Stop Probcode: ' + e.code + ', message: ' + e.message);
              });
        }
      }, function(e) {
          console.log('Start Prob code: ' + e.code + ', message: ' + e.message);
      });
          resolve(dbList);
    });*/
  //  }
}
