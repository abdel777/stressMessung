import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { InfoPage } from '../info/info';
import { HeartRateProvider } from '../../providers/heart-rate/heart-rate';
import Dygraph from 'dygraphs';

/**
 * Generated class for the HeartratePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-heartrate',
  templateUrl: 'heartrate.html',
})
export class HeartratePage {
   public lottieConfig: Object;
    private anim: any;
    private animationSpeed: number = 1;
    hr:number;

  constructor(public navCtrl: NavController, public navParams: NavParams,public heartRate : HeartRateProvider) {
 this.lottieConfig = {
            path: 'assets/heart.json',
            autoplay: true,
            loop: true
        };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HeartratePage');
    this.drawInstantChart();
  }

 handleAnimation(anim: any) {
        this.anim = anim;
    }

openInfo(){
  this.navCtrl.push(InfoPage);
}


drawInstantChart(){

  if(this.heartRate.H7isConncted){
    var data =[[Date.now(),this.heartRate.heartrate]];
  let THIS = this;
   var g = new Dygraph(document.getElementById("div_g"), data,
                          {
                            drawPoints: true,
                            drawAxis:false
                            //labels: ['Time', 'Random']
                          });
    let intervalId = window.setInterval(function() {
        var x =  Date.now();
        THIS.hr = THIS.heartRate.heartrate;
        data.push([x, THIS.hr]);
        g.updateOptions( { 'file': data } );
      }, 10000);
  }else{
    document.getElementById("div_g").innerHTML ='<h2> please connect with H7 to see the heart rates instantly</h2>';
    document.getElementById('#heartValue').innerHTML='';
  }
  
}




}
