import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {InitialstressPage} from "../initialstress/initialstress";
import {HomePage} from "../home/home";
import {KontoPage} from "../konto/konto";

/**
 * Generated class for the SlidersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sliders',
  templateUrl: 'sliders.html',
})
export class SlidersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SlidersPage');
  }
    slides = [
        {
            title: "The Privacy Notice for new users",
            description: "To provide <b>StressMessung functions in Hochschule Ruhr West</b> the app may collect data about the following :<ion-item ><ion-icon name='log-out' color='primary'></ion-icon><span class='tab-span'> About</span></ion-item>",
            image: "assets/imgs/logo.png",
        },
        {
            title: "What is Ionic?",
            description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
            image: "assets/imgs/logo.png",
        },
        {
            title: "What is Ionic Cloud?",
            description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
            image: "assets/imgs/logo.png",
        }
    ];
    toinitialstress(){
        this.navCtrl.push(InitialstressPage);
    }
    skip(){
        this.navCtrl.push(HomePage);
    }
    topersolandata(){
        this.navCtrl.push(KontoPage);
    }
}
