import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-konto',
  templateUrl: 'konto.html',
})
export class KontoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
                   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KontoPage');
  }
 
  goBack(){
  	this.navCtrl.setRoot(HomePage);
  }
}
