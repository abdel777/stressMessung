import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AuthServiceProvider} from '../providers/auth-service/auth-service';
import {SqliteservicesProvider} from '../providers/sqliteservices/sqliteservices';
import { LoadingController,ToastController } from 'ionic-angular';


import { HomePage } from '../pages/home/home';
import { EinstellungPage } from '../pages/einstellung/einstellung';
import { HeartratePage } from '../pages/heartrate/heartrate';
import { KontoPage } from '../pages/konto/konto';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { SlidersPage } from '../pages/sliders/sliders';

@Component({
  templateUrl: 'app.html',

})
export class MyApp {
  private username : any;
  private _id :any;
  loading:any;
 @ViewChild(Nav) nav:Nav;

 constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public authService: AuthServiceProvider,private _TOAST: ToastController,public loadingCtrl: LoadingController) {
  platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.username= localStorage.getItem('username');
      this._id =localStorage.getItem('_id');
      if(this.username && this._id){
          this.nav.setRoot(HomePage);
      }
      else{
          this.nav.setRoot(LoginPage);
      }
    });
  }

  gotoEinstellung(Page){
    this.nav.setRoot(EinstellungPage);
  }

  gotoKonto(){
    this.nav.setRoot(KontoPage);
  }

   gotoAbout(){
    this.nav.setRoot(AboutPage);
  }
  logout() {
        this.showLoader();
        this.authService.logout().then((result) => {
            this.loading.dismiss();
            this.nav.setRoot(LoginPage);
        }, (err) => {
            this.loading.dismiss();
            this.presentToast(err);
        });
    }
    showLoader(){
        this.loading = this.loadingCtrl.create({
            content: 'Login Out.'
        });

        this.loading.present();
    }
    presentToast(msg) {
        let toast = this._TOAST.create({
            message: msg,
            duration: 3000,
            position: 'bottom',
            dismissOnPageChange: true
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

    gotoLogin(){
    this.nav.setRoot(LoginPage);
  }
}
