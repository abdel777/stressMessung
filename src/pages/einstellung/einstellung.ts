import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { BluetouthPage } from '../bluetouth/bluetouth';
import { HomePage } from '../home/home';
import { ApiinformationPage} from '../apiinformation/apiinformation';


import { Storage } from '@ionic/storage';
import { HeartRateProvider } from '../../providers/heart-rate/heart-rate';
import { MidelwareProvider } from '../../providers/midelware/midelware';


import { ApiPage } from '../api/api';
import { Observable } from 'rxjs/Observable';
@IonicPage()
@Component({
  selector: 'page-einstellung',
  templateUrl: 'einstellung.html',
})
export class EinstellungPage {
disableButton: boolean = false;
disableH7button: boolean  =false;

data :any ;
datt : any;
DevicesId :any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage , public heartRate : HeartRateProvider,public midelware : MidelwareProvider) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EinstellungPage');
   console.log('this.heartRate.APICONNCTED',this.heartRate.APICONNCTED)

      this.disableH7button= this.heartRate.disableH7button ;
     this.disableButton= this.heartRate.APICONNCTED;
  }

  goBack(){
    this.navCtrl.setRoot(HomePage);
  }

searchBlue(){
  this.disableButton=false;
  this.disableH7button=true;

  this.navCtrl.push(BluetouthPage);
  

 
}
gotohomepage()
{

 this.disableH7button=false;
 this.disableButton= true;

console.log('this.heartRate.APICONNCTED',this.heartRate.APICONNCTED)
 this.heartRate.disconnect();
 this.navCtrl.push( ApiPage);


}






 experience()
 {
  this.navCtrl.push( ApiPage, {status: true});
 }


}