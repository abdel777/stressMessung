import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  NavController,
  NavParams,
  Platform,
  AlertController
} from 'ionic-angular';
/*
  Generated class for the PhoneStateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare var cordova;


@Injectable()
export class PhoneStateProvider {

  constructor(public http: HttpClient, public platform: Platform) {
    console.log('Hello PhoneStateProvider Provider');
  }

  getphonestate()  {
    return new Promise(resolve => {
    this.platform.ready().then(() => {
      (<any>window).an_sensors.isCallActive(function(res) {
        resolve(res);

      }, function() {
        console.error('An error occoured while do the command');
      });
    });

  });
  }


  getScreenlocked() {
    return new Promise(resolve => {
    this.platform.ready().then(() => {
      (<any>window).an_sensors.isDeviceLock(function(res) {
        resolve(res);
      }, function() {
        console.error('An error occoured while do the command');
      });
    });
  });
}

}
