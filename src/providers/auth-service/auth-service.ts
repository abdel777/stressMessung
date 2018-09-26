import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable,ViewChild } from '@angular/core';
import { Nav, NavParams, LoadingController, ToastController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HomePage} from "../../pages/home/home";
import {LoginPage} from "../../pages/login/login";
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


let apiUrl = 'https://murmuring-woodland-72589.herokuapp.com/api/';

@Injectable()
export class AuthServiceProvider {
    @ViewChild(Nav) nav: Nav;
    public items: Array<any>;
    loading: any;

  constructor(public http: HttpClient,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController){

  }

  login(credentials){
    return new Promise((resolve, reject)=>{
      let headers = new HttpHeaders();
      headers.append('content-Type','applicaton/json');
      this.http.post(apiUrl+'login',credentials,{headers:headers}).subscribe(res => {
          resolve(res);
      },(err)=>{
        reject(err);
      });
    });
  }

  register(data){
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers.append('Content-Type','application/json');
      this.http.post(apiUrl+'signup',data,{headers: headers}).subscribe(res=> {
          console.log("User seccessfully registred");
          resolve(res);
      },(err)=>{
        reject(err);
      });
    });
  }
  logout(){
    return new Promise((resolve, reject)=>{
          localStorage.clear();
          resolve(null);
      });
  }
  validateUsername(username) {
      return this.http.get(apiUrl + 'userdata/validateusername/' + username).map(res => {console.log(res); return res });
  }
    //General functions
    showLoader(msg){
        this.loading = this.loadingCtrl.create({
            content: msg
        });
        this.loading.present();
    }
    presentToast(msg) {
        let toast = this.toastCtrl.create({
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

}
