import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiinformationPage } from '../apiinformation/apiinformation';

import { HeartRateProvider } from '../../providers/heart-rate/heart-rate';


import { ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-api',
  templateUrl: 'api.html',
})
export class ApiPage {
 private email :string ="";
  constructor( private toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams  , public heartRate : HeartRateProvider,private storage: Storage ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApiPage');
  }

  go_to_information_Api()
  {
  this.navCtrl.push(ApiinformationPage);

  }
go_to_check_user()
{
    this.storage.get('Email').then((val) => {
    this.email=val;
  
    this.heartRate.check_user_api(this.email).then((resultat)=>{
      console.log("cheke user",resultat["statusCode"])
      if(resultat["statusCode"] == 200)
      {
         this.navCtrl.push(HomePage)
      }

      else
      {
            let toast = this.toastCtrl.create({
            message: 'You are not aouthorised  Your Api ',
            position: 'middle',
            duration: 5000
          });
          toast.present();      

      }

    })
   
  });
     
}


}